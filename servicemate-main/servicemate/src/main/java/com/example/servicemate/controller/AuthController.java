package com.example.servicemate.controller;

import com.example.servicemate.entity.User;
import com.example.servicemate.dto.UserDTO;
import com.example.servicemate.repository.UserRepository;
import com.example.servicemate.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JavaMailSender mailSender;
    @Autowired private JwtUtils jwtUtils;

    private static class OtpData {
        String otp;
        long expiryTime;
        OtpData(String otp, long expiryTime) { this.otp = otp; this.expiryTime = expiryTime; }
    }

    private Map<String, OtpData> otpCache = new HashMap<>();

    // 1. SEND OTP FOR SIGNUP
    @PostMapping("/signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered!");
        }
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpCache.put(email, new OtpData(otp, System.currentTimeMillis() + 60000));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verify your ServiceMate Account");
        message.setText("Your verification code is: " + otp);
        mailSender.send(message);
        return ResponseEntity.ok("Verification code sent!");
    }

    // 2. REGISTER USER (Manual Signup)
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        String email = userDTO.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(email)) return ResponseEntity.status(400).body("Email in use!");

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(email);
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole().toLowerCase());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        if ("provider".equals(user.getRole())) user.setServiceType(userDTO.getServiceType());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // 3. LOGIN (Standard)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO loginDTO) {
        String email = loginDTO.getEmail().toLowerCase().trim();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(loginDTO.getPassword(), userOpt.get().getPassword())) {
            String token = jwtUtils.generateToken(email);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", userOpt.get());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // 4. GOOGLE LOGIN
    // --- GOOGLE LOGIN (Identity Verification Only) ---
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();

        // 1. Check if user exists in DB
        Optional<User> userOpt = userRepository.findByEmail(email);

        // 2. If not found, DO NOT create account. Send error to Frontend.
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Account not found. Please sign up with your phone number first!");
        }

        // 3. User exists, so we have their phone number and role already.
        User user = userOpt.get();
        String token = jwtUtils.generateToken(email);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    // 5. FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        if (!userRepository.existsByEmail(email)) return ResponseEntity.status(404).body("User not found");
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpCache.put(email, new OtpData(otp, System.currentTimeMillis() + 60000));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("ServiceMate OTP");
        message.setText("Your OTP: " + otp);
        mailSender.send(message);
        return ResponseEntity.ok("OTP Sent");
    }

    // 6. VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        String otp = request.get("otp");
        OtpData cached = otpCache.get(email);
        if (cached != null && System.currentTimeMillis() < cached.expiryTime && cached.otp.equals(otp)) {
            return ResponseEntity.ok("Verified");
        }
        return ResponseEntity.status(401).body("Invalid or Expired OTP");
    }

    // 7. RESET PASSWORD
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(request.get("password")));
            userRepository.save(user.get());
            otpCache.remove(email);
            return ResponseEntity.ok("Password Reset Successful");
        }
        return ResponseEntity.status(404).body("Error");
    }
}