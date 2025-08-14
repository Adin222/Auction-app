package com.adin222.auctionapp.repository;

import com.adin222.auctionapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
