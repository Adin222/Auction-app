package com.adin222.auctionapp.service;

import com.adin222.auctionapp.DTO.Registration.UserDTO;
import com.adin222.auctionapp.models.User;
import com.adin222.auctionapp.repository.RegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class RegistrationServices {

    private final RegistrationRepository registrationRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegistrationServices(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String registerUser(UserDTO userDTO) {

        if (userDTO.getFirstName() == null || userDTO.getFirstName().isEmpty() ||
            userDTO.getLastName() == null || userDTO.getLastName().isEmpty() ||
            userDTO.getEmail() == null || userDTO.getEmail().isEmpty() ||
            userDTO.getPassword() == null || userDTO.getPassword().isEmpty() ||
            userDTO.getRole() == null || userDTO.getRole().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "All fields are required.");
        }


        if (userDTO.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must have at least 8 characters.");
        }


        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        if (!pattern.matcher(userDTO.getEmail()).matches()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect email address format.");
        }


        Optional<User> existingUser = registrationRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(userDTO.getEmail()))
                .findFirst();

        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already taken.");
        }

        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());

        User newUser = new User();
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(hashedPassword);
        newUser.setRole(userDTO.getRole());

        registrationRepository.save(newUser);

        return "Registration successful";
    }
}
