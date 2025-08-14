package com.adin222.auctionapp.DTO.Registration;

public class LoggedUser {

    private Long userId;
    private String email;
    private String role;
    private String accessToken; 

    public LoggedUser() {
    }

    public LoggedUser(Long userId, String email, String role) {
        this.userId = userId;
        this.email = email;
        this.role = role;
    }


    public LoggedUser(Long userId, String email, String role, String accessToken) {
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.accessToken = accessToken;
    }


    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getAccessToken() {
        return accessToken;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
