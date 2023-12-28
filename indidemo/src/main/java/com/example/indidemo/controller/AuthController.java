package com.example.indidemo.controller;
import com.example.indidemo.model.auth.AuthRequest;
import com.example.indidemo.model.Admin;
import com.example.indidemo.model.User;
import com.example.indidemo.repository.AdminRepository;
import com.example.indidemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class AuthController {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/admin")
    public ResponseEntity<String> authenticateAdmin(@RequestBody AuthRequest authRequest) {
        // Assuming AdminRepository has the appropriate method for authentication
        Admin admin = adminRepository.findByNameAndPositionAndPasswd(
                authRequest.getName(),
                authRequest.getPosition(),
                authRequest.getPasswd()
        );
        if (admin != null) {
            // Successful authentication
            return new ResponseEntity<>("Admin authentication successful", HttpStatus.OK);
        } else {
            // Failed authentication
            return new ResponseEntity<>("Admin authentication failed", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<String> authenticateUser(@RequestBody AuthRequest authRequest) {
        // Assuming UserRepository has the appropriate method for authentication
        User user = userRepository.findByNameAndPasswd(
                authRequest.getName(),
                authRequest.getPasswd()
        );

        if (user != null) {
            // Successful authentication
            return new ResponseEntity<>("User authentication successful", HttpStatus.OK);
        } else {
            // Failed authentication
            return new ResponseEntity<>("User authentication failed", HttpStatus.UNAUTHORIZED);
        }
    }
}