package com.adin222.auctionapp.controllers;

import com.adin222.auctionapp.DTO.Registration.LoggedUser;
import com.adin222.auctionapp.DTO.Registration.UserLogin;
import com.adin222.auctionapp.service.AuthenticationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/api")
public class AuthenticationController {
    
    private final AuthenticationServices authenticationServices;

    public AuthenticationController(AuthenticationServices authenticationServices) {
        this.authenticationServices = authenticationServices;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserLogin userLogin, HttpServletResponse response){
        try{
        LoggedUser loggedUser = authenticationServices.LoginService(userLogin);

        Cookie cookie = new Cookie("accessToken", loggedUser.getAccessToken());

        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 14);

        response.addCookie(cookie);

        Map<String, String> response_user = Map.of("message", "Login successful");

        return ResponseEntity.ok(response_user);

        }catch (ResponseStatusException e) {
        Map<String, String> error = Map.of("error", e.getReason());
        return ResponseEntity.status(e.getStatusCode()).body(error);
        }
        
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "accessToken", required = false) String token) {
       try {
        LoggedUser loggedUser = authenticationServices.me(token);
        return ResponseEntity.ok(loggedUser);
       } catch (ResponseStatusException e) {
        Map<String, String> error = Map.of("error", e.getReason());
        return ResponseEntity.status(e.getStatusCode()).body(error);
       }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("accessToken", null);

        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "You have successfully logged out"));
    }

}
