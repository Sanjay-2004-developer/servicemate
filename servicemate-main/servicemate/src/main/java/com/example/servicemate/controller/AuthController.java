package com.example.servicemate.controller;

import com.example.servicemate.entity.User;
import com.example.servicemate.dto.UserDTO;
import com.example.servicemate.repository.UserRepository;
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

    private static class OtpData {
        String otp;
        long expiryTime;
        OtpData(String otp, long expiryTime) { this.otp = otp; this.expiryTime = expiryTime; }
    }

    private Map<String, OtpData> otpCache = new HashMap<>();

    // --- NEW: SEND OTP FOR SIGNUP ---
    @PostMapping("/signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered!");
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        otpCache.put(email, new OtpData(otp, System.currentTimeMillis() + 60000)); // 1 min expiry

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verify your ServiceMate Account");
        message.setText("Your verification code is: " + otp + ". It expires in 1 minute.");
        mailSender.send(message);

        return ResponseEntity.ok("Verification code sent!");
    }

    // --- UPDATED: REGISTER USER (Final Step) ---
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        String email = userDTO.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use!");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(email);
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole().toLowerCase());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        if ("provider".equals(user.getRole())) {
            user.setServiceType(userDTO.getServiceType());
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // --- LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO loginDTO) {
        String email = loginDTO.getEmail().toLowerCase().trim();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(loginDTO.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // --- FORGOT PASSWORD ---
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        if (!userRepository.existsByEmail(email)) return ResponseEntity.status(404).body("User not found");

        String otp = String.format("%06d", new Random().nextInt(999999));
        otpCache.put(email, new OtpData(otp, System.currentTimeMillis() + 60000));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("ServiceMate OTP");
        message.setText("Your OTP: " + otp + ". Expires in 1 min.");
        mailSender.send(message);
        return ResponseEntity.ok("OTP Sent");
    }

    // --- VERIFY OTP ---
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

    // --- RESET PASSWORD ---
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