package com.adin222.auctionapp.DTO.Wishlist;

public class WishlistDTO {
    private Long id;
    private String imageUrl;
    private String name;
    private String timeLeft;
    private Double highestBid;
    private String status;

    public WishlistDTO() {
    }

    public WishlistDTO(Long id, String imageUrl, String name, String timeLeft, Double highestBid, String status) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.timeLeft = timeLeft;
        this.highestBid = highestBid;
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName(){
        return name;
    }

    public Long getId(){
        return id;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(String timeLeft) {
        this.timeLeft = timeLeft;
    }

    public Double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(Double highestBid) {
        this.highestBid = highestBid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setId(Long id){
        this.id = id;
    }
}
