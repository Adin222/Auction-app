package com.adin222.auctionapp.models;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "bids")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @ManyToMany
    @JoinTable(
        name = "user_bids",
        joinColumns = @JoinColumn(name = "bid_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> bidders = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;


    public Bid() {
    }

    public Bid(Double amount, Set<User> bidders, Auction auction) {
        this.amount = amount;
        this.bidders = bidders != null ? bidders : new HashSet<>();
        this.auction = auction;
    }


    public Long getId() {
        return id;
    }

    public Double getAmount() {
        return amount;
    }

    public Set<User> getBidders() {
        return bidders;
    }

    public Auction getAuction() {
        return auction;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setBidders(Set<User> bidders) {
        this.bidders = bidders;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }
}
