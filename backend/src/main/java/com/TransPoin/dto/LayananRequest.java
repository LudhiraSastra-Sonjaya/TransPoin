package com.TransPoin.dto;


public class LayananRequest {
    private String jenis;
    private String deskripsi;
    private Long userId;


    // Generated Constructors, Getters and Setters
    public LayananRequest() {
    }

    public LayananRequest(String jenis, String deskripsi, Long userId) {
        this.jenis = jenis;
        this.deskripsi = deskripsi;
        this.userId = userId;
    }

    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
