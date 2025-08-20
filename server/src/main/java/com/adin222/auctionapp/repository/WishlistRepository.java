package com.adin222.auctionapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adin222.auctionapp.models.Wishlist;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    boolean existsByProductIdAndUserId(Long productId, Long userId);
    Wishlist findByProductIdAndUserId(Long productId, Long userId);
    List<Wishlist> findAllByUserId(Long userId);
}


