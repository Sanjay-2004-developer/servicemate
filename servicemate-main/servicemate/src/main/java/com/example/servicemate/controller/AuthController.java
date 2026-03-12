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

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use!");
        }
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole().toLowerCase());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        if ("provider".equals(user.getRole())) user.setServiceType(userDTO.getServiceType());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO loginDTO) {
        Optional<User> userOpt = userRepository.findByEmail(loginDTO.getEmail());
        if (userOpt.isPresent() && passwordEncoder.matches(loginDTO.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
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

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        OtpData cached = otpCache.get(email);
        if (cached != null && System.currentTimeMillis() < cached.expiryTime && cached.otp.equals(otp)) {
            return ResponseEntity.ok("Verified");
        }
        return ResponseEntity.status(401).body("Invalid or Expired OTP");
    }

    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        Optional<User> user = userRepository.findByEmail(request.get("email"));
        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(request.get("password")));
            userRepository.save(user.get());
            otpCache.remove(request.get("email"));
            return ResponseEntity.ok("Password Reset Successful");
        }
        return ResponseEntity.status(404).body("Error");
    }
}