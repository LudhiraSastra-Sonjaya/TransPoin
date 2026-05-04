package com.TransPoin.dto;


public class AdminResponse {
    private Long id;
    private String nama;
    private String email;


    // Generated Constructors, Getters and Setters
    public AdminResponse() {
    }

    public AdminResponse(Long id, String nama, String email) {
        this.id = id;
        this.nama = nama;
        this.email = email;
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

}
