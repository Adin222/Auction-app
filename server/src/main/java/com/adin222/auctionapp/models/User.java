package com.adin222.auctionapp.models;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String role;

    @ManyToMany(mappedBy = "bidders")
    private Set<Bid> bids = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Wishlist> wishlist = new HashSet<>();


    public User() {
    }

    public User(String firstName, String lastName, String email, String password,
                String role, Set<Bid> bids, Set<Wishlist> wishlist) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.bids = bids;
        this.wishlist = wishlist;
    }


    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public Set<Bid> getBids() {
        return bids;
    }

    public Set<Wishlist> getWishlist() {
        return wishlist;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setBids(Set<Bid> bids) {
        this.bids = bids;
    }

    public void setWishlist(Set<Wishlist> wishlist) {
        this.wishlist = wishlist;
    }
}
