package com.adin222.auctionapp.service;

import java.util.HashSet;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Set;
import com.adin222.auctionapp.DTO.Bid.BidDTO;
import com.adin222.auctionapp.config.RequireToken;
import com.adin222.auctionapp.models.Auction;
import com.adin222.auctionapp.models.Bid;
import com.adin222.auctionapp.models.Product;
import com.adin222.auctionapp.models.User;
import com.adin222.auctionapp.repository.AuctionRepository;
import com.adin222.auctionapp.repository.AuthenticationRepository;
import com.adin222.auctionapp.repository.BidRepository;
import com.adin222.auctionapp.repository.ProductRepository;
import com.adin222.auctionapp.utils.JwtUtil;

import io.jsonwebtoken.Claims;

@Service
public class BidServices {
    private final BidRepository bidRepository;
    private final AuthenticationRepository authenticationRepository;
    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;
    private final JwtUtil jwtUtil;

    public BidServices(BidRepository bidRepository, JwtUtil jwtUtil, AuthenticationRepository authenticationRepository, AuctionRepository auctionRepository, ProductRepository productRepository){
        this.bidRepository = bidRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationRepository = authenticationRepository;
        this.auctionRepository = auctionRepository;
        this.productRepository = productRepository;
    }
    
    @RequireToken
    public String makeBid(String token, BidDTO bidDTO, Long auctionId){

        if(bidDTO.getAmount() <= 0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount cannot be zero or less!");
        }

        if(bidDTO.getAmount() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount cannot be empty!");
        }

        Claims claims = jwtUtil.parseToken(token);
        Long userId = claims.get("userId", Long.class);

        Bid highestBid = bidRepository.findTopByAuctionIdOrderByAmountDesc(auctionId);

        if(highestBid != null){
            if((bidDTO.getAmount() - highestBid.getAmount()) < 5){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bid has to be at least 5 dollars higher than current highest bid");
            }
        }

        User user = authenticationRepository.getUserById(userId);
        Auction auction = auctionRepository.getAuctionById(auctionId); 

        if(user == null || auction == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or auction not found");
        }

        Product product = productRepository.getProductById(auction.getProduct().getId());

        if(product == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }

        if(highestBid == null && product.getStartingPrice() > bidDTO.getAmount()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bid has to be higher than the starting price!");
        }

        Set<User> bidders = new HashSet<>();
        bidders.add(user);

        Bid newBid = new Bid(bidDTO.getAmount(), bidders, auction);

        bidRepository.save(newBid);

        return "Bid successfully made";

    }

}
