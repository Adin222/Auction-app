package com.adin222.auctionapp.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import com.adin222.auctionapp.DTO.Registration.AuctionProduct;
import com.adin222.auctionapp.models.Auction;
import com.adin222.auctionapp.models.Product;
import com.adin222.auctionapp.repository.AuctionRepository;
import com.adin222.auctionapp.repository.ProductRepository;
import java.time.OffsetDateTime;

@Service
public class AuctionServices {

    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;

    public AuctionServices(AuctionRepository auctionRepository, ProductRepository productRepository){
        this.auctionRepository = auctionRepository;
        this.productRepository = productRepository;
    }

    public String CreateAuction(AuctionProduct auctionProduct){

        if (auctionProduct.getName() == null || auctionProduct.getName().trim().isEmpty()
            || auctionProduct.getCategory() == null || auctionProduct.getCategory().trim().isEmpty()
            || auctionProduct.getDescription() == null || auctionProduct.getDescription().trim().isEmpty()
            || auctionProduct.getStartDate() == null || auctionProduct.getStartDate().trim().isEmpty()
            || auctionProduct.getEndDate() == null || auctionProduct.getEndDate().trim().isEmpty()
            || auctionProduct.getAddress() == null || auctionProduct.getAddress().trim().isEmpty()
            || auctionProduct.getCountry() == null || auctionProduct.getCountry().trim().isEmpty()
            || auctionProduct.getCity() == null || auctionProduct.getCity().trim().isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "All fields are required.");
        }

        if (auctionProduct.getStartPrice() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start price cannot be less than zero");
        }

        Product product = new Product(
            auctionProduct.getName(),
            auctionProduct.getCategory(),     
            auctionProduct.getDescription(),
            auctionProduct.getImageUrl1(),
            auctionProduct.getImageUrl2(),
            auctionProduct.getImageUrl3(),
            auctionProduct.getStartPrice(),
            null
            );

        Product savedProduct = productRepository.save(product);

        OffsetDateTime odt_1 = OffsetDateTime.parse(auctionProduct.getStartDate());
        OffsetDateTime odt_2 = OffsetDateTime.parse(auctionProduct.getEndDate());


        Auction auction = new Auction(
            savedProduct,
            odt_1.toLocalDateTime(),
            odt_2.toLocalDateTime(),
            null,        
            null        
        );

        auctionRepository.save(auction);
        


        return "Auction successfully created";

    }
    
}
