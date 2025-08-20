package com.adin222.auctionapp.DTO.Product;

public class ProductSearchDTO {
    
    private Long id;
    private String name;
    private String imageUrl;

    public ProductSearchDTO() {
    }

    public ProductSearchDTO(Long id, String name, String imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public Long getId(){
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setId(Long id){
        this.id = id;
    }
}
