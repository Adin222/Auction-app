package com.adin222.auctionapp.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.adin222.auctionapp.DTO.Bid.BidDTO;
import com.adin222.auctionapp.config.RequireToken;
import com.adin222.auctionapp.service.BidServices;


@RestController
@RequestMapping("/api")
public class BidController {

    private final BidServices bidServices;

    public BidController(BidServices bidServices){
        this.bidServices = bidServices;
    }

    @RequireToken
    @PostMapping("/make-bid/{auctionId}")
    public ResponseEntity<Map<String, String>> makeBid(@PathVariable Long auctionId, @CookieValue(name = "accessToken", required = false) String token, @RequestBody BidDTO bidDTO){
        try{
            String message = bidServices.makeBid(token, bidDTO, auctionId);
            Map<String, String> response = Map.of("message", message);
            return ResponseEntity.ok(response);

        }catch (ResponseStatusException e) {
           Map<String, String> errorResponse = Map.of("error", e.getReason());
           return ResponseEntity
            .status(e.getStatusCode())
            .body(errorResponse);
        }
    }


}
