package com.adin222.auctionapp.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.adin222.auctionapp.DTO.Registration.LoggedUser;
import com.adin222.auctionapp.DTO.Registration.UserLogin;
import com.adin222.auctionapp.models.User;
import com.adin222.auctionapp.repository.AuthenticationRepository;
import com.adin222.auctionapp.utils.JwtUtil;

import io.jsonwebtoken.Claims;



@Service
public class AuthenticationServices {

    private final AuthenticationRepository authenticationRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthenticationServices(AuthenticationRepository authenticationRepository, JwtUtil jwtUtil){
        this.authenticationRepository = authenticationRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public LoggedUser LoginService(UserLogin userData){

        if(userData.getEmail() == null || userData.getEmail().isEmpty() || 
           userData.getPassword() == null || userData.getPassword().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "All fields are required.");
        }

        User user = authenticationRepository.findByEmail(userData.getEmail());

        if(user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!passwordEncoder.matches(userData.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
        }

        String accessToken = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

        LoggedUser loggedUser = new LoggedUser(user.getId(), user.getEmail(), user.getRole(), accessToken);

        return loggedUser;
    }

    public LoggedUser me(String token){
        
        if (token == null){
            return new LoggedUser(-1L, "", "guest");
        }

        Claims claims = jwtUtil.parseToken(token);

        Long userId = claims.get("userId", Long.class);
        String email = claims.get("email", String.class);
        String role = claims.get("role", String.class);

        return new LoggedUser(userId, email, role);
    }
    
}
