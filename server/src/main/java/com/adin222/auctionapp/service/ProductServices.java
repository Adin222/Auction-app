package com.adin222.auctionapp.service;

import com.adin222.auctionapp.DTO.Product.ProductDTO;
import com.adin222.auctionapp.models.Product;
import com.adin222.auctionapp.repository.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServices {

    private final ProductRepository productRepository;

    public ProductServices(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> getProductsByFilter(String category, String sortBy, String order, int page, int size) {
        Sort.Direction direction = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Sort sort;
        if (sortBy == null || sortBy.isBlank() || sortBy.equals("date")) {
            sort = Sort.by(direction, "createdAt");
        } else if (sortBy.equals("price")) {
            sort = Sort.by(direction, "startingPrice");
        } else if (sortBy.equals("name")) {
            sort = Sort.by(direction, "productName");
        } else {
            sort = Sort.by(direction, "createdAt");
        }

        PageRequest pageRequest = PageRequest.of(page, size, sort);

        List<Product> products;
        if (category != null && !category.isBlank()) {
            products = productRepository.findByCategory(category, pageRequest).getContent();
        } else {
            products = productRepository.findAll(pageRequest).getContent();
        }

        return products.stream()
                .map(p -> new ProductDTO(
                        p.getId(),
                        p.getProductName(),
                        p.getCategory(),
                        p.getDescription(),
                        p.getImageUrl1(),
                        p.getImageUrl2(),
                        p.getImageUrl3(),
                        p.getStartingPrice(),
                        p.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public ProductDTO getProductDetails(Long id){
        Product product = productRepository.getProductById(id);

        if (product == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "All fields are required.");
        }

        ProductDTO productDTO = new ProductDTO(
            product.getId(), 
            product.getProductName(), 
            product.getCategory(), 
            product.getDescription(), 
            product.getImageUrl1(), 
            product.getImageUrl2(), 
            product.getImageUrl3(), 
            product.getStartingPrice(), 
            product.getCreatedAt());

        return productDTO;
    }
}
