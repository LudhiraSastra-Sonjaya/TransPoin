package com.TransPoin.dto;


public class AdminLoginRequest {
    private String email;
    private String password;


    // Generated Constructors, Getters and Setters
    public AdminLoginRequest() {
    }

    public AdminLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
