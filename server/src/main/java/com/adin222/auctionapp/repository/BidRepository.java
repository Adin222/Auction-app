package com.adin222.auctionapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adin222.auctionapp.models.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    Bid findTopByOrderByAmountDesc();
    Bid findTopByAuctionIdOrderByAmountDesc(Long auctionId);
}

