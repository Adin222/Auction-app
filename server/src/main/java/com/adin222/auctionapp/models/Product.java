package com.adin222.auctionapp.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String category;

    @Column(length = 700)
    private String description;

    @Column(nullable = false)
    private String imageUrl1;

    @Column(nullable = false)
    private String imageUrl2;

    @Column(nullable = false)
    private String imageUrl3;

    private Double startingPrice;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private Auction auction;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Product() {}

    public Product(String productName, String category, String description,
                   String imageUrl1, String imageUrl2, String imageUrl3,
                   Double startingPrice, Auction auction) {
        this.productName = productName;
        this.category = category;
        this.description = description;
        this.imageUrl1 = imageUrl1;
        this.imageUrl2 = imageUrl2;
        this.imageUrl3 = imageUrl3;
        this.startingPrice = startingPrice;
        this.auction = auction;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl1() {
        return imageUrl1;
    }

    public String getImageUrl2() {
        return imageUrl2;
    }

    public String getImageUrl3() {
        return imageUrl3;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImageUrl1(String imageUrl1) {
        this.imageUrl1 = imageUrl1;
    }

    public void setImageUrl2(String imageUrl2) {
        this.imageUrl2 = imageUrl2;
    }

    public void setImageUrl3(String imageUrl3) {
        this.imageUrl3 = imageUrl3;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }
}
