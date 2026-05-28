package com.TransPoin.dto;


public class UserResponse {
    private Long id;
    private String nama;
    private String email;
    private Integer totalPoin;
    private String role;


    // Generated Constructors, Getters and Setters
    public UserResponse() {
    }

    public UserResponse(Long id, String nama, String email, Integer totalPoin, String role) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.totalPoin = totalPoin;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getTotalPoin() {
        return totalPoin;
    }

    public void setTotalPoin(Integer totalPoin) {
        this.totalPoin = totalPoin;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
