package com.adin222.auctionapp.DTO.Product;

public class ProductDetailsResponseDTO {

    private ProductDTO product;
    private DateRangeDTO date;

    public ProductDetailsResponseDTO() {
    }

    public ProductDetailsResponseDTO(ProductDTO product, DateRangeDTO date) {
        this.product = product;
        this.date = date;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public DateRangeDTO getDate() {
        return date;
    }

    public void setDate(DateRangeDTO date) {
        this.date = date;
    }
}

