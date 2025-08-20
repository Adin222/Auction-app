package com.adin222.auctionapp.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.adin222.auctionapp.DTO.Wishlist.WishlistDTO;
import com.adin222.auctionapp.models.Auction;
import com.adin222.auctionapp.models.Bid;
import com.adin222.auctionapp.models.Product;
import com.adin222.auctionapp.models.User;
import com.adin222.auctionapp.models.Wishlist;
import com.adin222.auctionapp.repository.AuthenticationRepository;
import com.adin222.auctionapp.repository.BidRepository;
import com.adin222.auctionapp.repository.ProductRepository;
import com.adin222.auctionapp.repository.WishlistRepository;
import com.adin222.auctionapp.utils.JwtUtil;
import com.adin222.auctionapp.utils.TimeUtils;
import java.util.ArrayList;
import java.util.List;
import io.jsonwebtoken.Claims;


@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final AuthenticationRepository authenticationRepository;
    private final BidRepository bidRepository;
    private final JwtUtil jwtUtil;

    public WishlistService(WishlistRepository wishlistRepository, JwtUtil jwtUtil, ProductRepository productRepository, AuthenticationRepository authenticationRepository, BidRepository bidRepository){
        this.wishlistRepository = wishlistRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationRepository = authenticationRepository;
        this.productRepository = productRepository;
        this.bidRepository = bidRepository;
    }

    public String addToWishlist(String token, Long productId){
        Claims claims = jwtUtil.parseToken(token);
        Long userId = claims.get("userId", Long.class);

        Wishlist wishlistExists = wishlistRepository.findByProductIdAndUserId(productId, userId);

        if(wishlistExists != null){
            wishlistRepository.delete(wishlistExists);
            return "Successfully removed from wishlist";
        }

        User user = authenticationRepository.getUserById(userId);
        Product product = productRepository.getProductById(productId);

        if(user == null || product == null){
             throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or product not found");
        }

        Wishlist wishlist = new Wishlist(user, product);

        wishlistRepository.save(wishlist);

        return "Successfully added to wishlist";
    }

    public List<WishlistDTO> getWishlistItems(String token){
        Claims claims = jwtUtil.parseToken(token);
        Long userId = claims.get("userId", Long.class);
        List<Wishlist> wishlistList = wishlistRepository.findAllByUserId(userId);
        List<WishlistDTO> dtoList = new ArrayList<>();

        for(Wishlist w : wishlistList){
            Product product = w.getProduct();
            Auction auction = product.getAuction();

            Bid highestBid = bidRepository.findTopByAuctionIdOrderByAmountDesc(auction.getId());
            Double highestBidAmount = (highestBid != null) ?
            highestBid.getAmount() : 0;
            
            String status = TimeUtils.getAuctionStatus(auction.getEndTime());
            String timeLeft = TimeUtils.calculateTimeLeft(auction.getEndTime());

            WishlistDTO wishDto = new WishlistDTO(product.getId(), product.getImageUrl1(), product.getProductName(), timeLeft, highestBidAmount, status);

            dtoList.add(wishDto);
        }

        return dtoList;
    }
    
}
