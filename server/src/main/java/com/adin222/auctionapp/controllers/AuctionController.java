package com.adin222.auctionapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.adin222.auctionapp.DTO.Registration.AuctionProduct;
import com.adin222.auctionapp.config.RequireToken;
import com.adin222.auctionapp.service.AuctionServices;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuctionController {
    private final AuctionServices auctionServices;

    public AuctionController(AuctionServices auctionServices){
        this.auctionServices = auctionServices;
    }

    @RequireToken
    @PostMapping("/auction")
    public ResponseEntity<Map<String, String>> AuctionCreate(@RequestBody AuctionProduct auctionProduct){
        try{
            String response = auctionServices.CreateAuction(auctionProduct);
            Map<String, String> response_json = Map.of("message", response);

            return ResponseEntity.ok(response_json);
        }catch(ResponseStatusException e){
        Map<String, String> error = Map.of("error", e.getReason());
        return ResponseEntity.status(e.getStatusCode()).body(error);
        }
    }

}
