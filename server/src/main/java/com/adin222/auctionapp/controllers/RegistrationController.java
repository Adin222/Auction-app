package com.adin222.auctionapp.controllers;

import com.adin222.auctionapp.DTO.Registration.UserDTO;
import com.adin222.auctionapp.service.RegistrationServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    private final RegistrationServices registrationServices;

    public RegistrationController(RegistrationServices registrationServices) {
        this.registrationServices = registrationServices;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserDTO userDTO) {
    try {
        String message = registrationServices.registerUser(userDTO);
        Map<String, String> response = Map.of("message", message);
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
        Map<String, String> error = Map.of("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    } catch (ResponseStatusException e) {
        Map<String, String> error = Map.of("error", e.getReason());
        return ResponseEntity.status(e.getStatusCode()).body(error);
    } catch (Exception e) {
        Map<String, String> error = Map.of("error", "An unexpected error occurred: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

}
