package com.adin222.auctionapp.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "auctions")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    private User winner;

    @OneToMany(mappedBy = "auction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Bid> bids = new HashSet<>();


    public Auction() {
    }

    public Auction(Product product, LocalDateTime startTime, LocalDateTime endTime, User winner, Set<Bid> bids) {
        this.product = product;
        this.startTime = startTime;
        this.endTime = endTime;
        this.winner = winner;
        this.bids = bids != null ? bids : new HashSet<>();
    }


    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public User getWinner() {
        return winner;
    }

    public Set<Bid> getBids() {
        return bids;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setWinner(User winner) {
        this.winner = winner;
    }

    public void setBids(Set<Bid> bids) {
        this.bids = bids;
    }
}
