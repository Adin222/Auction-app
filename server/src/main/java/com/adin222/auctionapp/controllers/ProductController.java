package com.adin222.auctionapp.controllers;

import com.adin222.auctionapp.DTO.Product.ProductDTO;
import com.adin222.auctionapp.service.ProductServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductServices productServices;

    public ProductController(ProductServices productServices) {
        this.productServices = productServices;
    }

    @GetMapping("/products")
    public List<ProductDTO> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "date") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "8") int size
    ) {
        return productServices.getProductsByFilter(category, sortBy, order, page, size);
    }
}
