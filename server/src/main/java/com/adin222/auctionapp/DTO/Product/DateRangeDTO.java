package com.adin222.auctionapp.DTO.Product;
import java.time.LocalDateTime;

public class DateRangeDTO {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double amount;
    private Boolean wishListed;

    public DateRangeDTO() {
    }

    public DateRangeDTO(LocalDateTime startTime, LocalDateTime endTime, Double amount, Boolean wishListed) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.amount = amount;
        this.wishListed = wishListed;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public Double getAmount(){
        return amount;
    }

    public Boolean getWishlisted(){
        return wishListed;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setWishlisted(Boolean wishlisted){
        this.wishListed = wishlisted;
    }
}
