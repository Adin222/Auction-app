package com.adin222.auctionapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
import java.util.List;
import com.adin222.auctionapp.DTO.Wishlist.WishlistDTO;
import com.adin222.auctionapp.config.RequireToken;
import com.adin222.auctionapp.service.WishlistService;

@RestController
@RequestMapping("/api")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService){
        this.wishlistService = wishlistService;
    }

    @RequireToken
    @PostMapping("/add-wishlist/{productId}")
    public ResponseEntity<Map<String, String>> saveToWishlist(@PathVariable Long productId, @CookieValue(name = "accessToken", required = false) String token){
        try{
            String message = wishlistService.addToWishlist(token, productId);
            Map<String, String> response = Map.of("message", message);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
           Map<String, String> errorResponse = Map.of("error", e.getReason());
           return ResponseEntity
            .status(e.getStatusCode())
            .body(errorResponse);
        }
    }

    @RequireToken
    @GetMapping("/wishlist")
    public ResponseEntity<Map<String, List<WishlistDTO>>> getWishlist(@CookieValue(name = "accessToken", required = false) String token){
        try{
            List<WishlistDTO> wishlist = wishlistService.getWishlistItems(token);
            Map<String, List<WishlistDTO>> response = Map.of("items", wishlist);
            return ResponseEntity.ok(response);

        }catch(ResponseStatusException e){
            return ResponseEntity
                .status(e.getStatusCode())
                .body(null); 
        }
    }
    
}
