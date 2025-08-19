package com.adin222.auctionapp.repository;

import com.adin222.auctionapp.models.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Auction getAuctionByProductId(Long id);
    Auction getAuctionById(Long id);
}
