package com.adin222.auctionapp.service;

import com.adin222.auctionapp.DTO.Product.DateRangeDTO;
import com.adin222.auctionapp.DTO.Product.ProductDTO;
import com.adin222.auctionapp.DTO.Product.ProductDetailsResponseDTO;
import com.adin222.auctionapp.DTO.Product.ProductSearchDTO;
import com.adin222.auctionapp.models.Auction;
import com.adin222.auctionapp.models.Bid;
import com.adin222.auctionapp.models.Product;
import com.adin222.auctionapp.repository.AuctionRepository;
import com.adin222.auctionapp.repository.BidRepository;
import com.adin222.auctionapp.repository.ProductRepository;
import com.adin222.auctionapp.repository.WishlistRepository;
import com.adin222.auctionapp.utils.JwtUtil;

import io.jsonwebtoken.Claims;

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
    private final AuctionRepository auctionRepository;
    private final WishlistRepository wishlistRepository;
    private final JwtUtil jwtUtil;
    private final BidRepository bidRepository;

    public ProductServices(ProductRepository productRepository, AuctionRepository auctionRepository, BidRepository bidRepository, WishlistRepository wishlistRepository, JwtUtil jwtUtil) {
        this.productRepository = productRepository;
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.wishlistRepository = wishlistRepository;
        this.jwtUtil = jwtUtil;
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

    public ProductDetailsResponseDTO getProductDetails(Long id, String token){
           Product product = productRepository.getProductById(id);
           Auction auction = auctionRepository.getAuctionByProductId(id);
           Bid bid = bidRepository.findTopByAuctionIdOrderByAmountDesc(auction.getId());

           Boolean wishlisted = false; 

    if (token != null && !token.isEmpty()) {
        try {
            Claims claims = jwtUtil.parseToken(token);
            Long userId = claims.get("userId", Long.class);

            wishlisted = wishlistRepository.existsByProductIdAndUserId(id, userId);
        } catch (Exception e) {
            wishlisted = false;
        }
    }

    if (product == null || auction == null){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product, auction or bid not found");
    }

    Double amount = (bid != null) ? bid.getAmount() : 0;

    ProductDTO productDTO = new ProductDTO(
        product.getId(), 
        product.getProductName(), 
        product.getCategory(), 
        product.getDescription(), 
        product.getImageUrl1(), 
        product.getImageUrl2(), 
        product.getImageUrl3(), 
        product.getStartingPrice(), 
        product.getCreatedAt()
    );

    DateRangeDTO dateRangeDTO = new DateRangeDTO(
        auction.getStartTime(),
        auction.getEndTime(),
        amount,
        wishlisted,
        auction.getId()
    );

    return new ProductDetailsResponseDTO(productDTO, dateRangeDTO);
  }

  public List<ProductSearchDTO> searchProducts(String query){
    if (query == null || query.trim().isEmpty()) {
        return List.of();
    }
    List<Product> products = productRepository.findByProductNameContainingIgnoreCase(query);

    return products.stream()
            .map(p -> new ProductSearchDTO(p.getId(), p.getProductName(), p.getImageUrl1()))
            .collect(Collectors.toList());
  }

}
