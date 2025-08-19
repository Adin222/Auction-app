package com.adin222.auctionapp.DTO.Bid;

public class BidDTO {

    private Double amount;

    public BidDTO() {
    }

    public BidDTO(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
