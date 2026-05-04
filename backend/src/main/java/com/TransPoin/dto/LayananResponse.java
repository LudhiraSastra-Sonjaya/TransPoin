package com.TransPoin.dto;


import java.time.LocalDate;

public class LayananResponse {
    private Long id;
    private String jenis;
    private String deskripsi;
    private LocalDate tanggal;
    private String status;
    private Long userId;
    private String userName;
    private Long adminId;
    private String adminNama;


    // Generated Constructors, Getters and Setters
    public LayananResponse() {
    }

    public LayananResponse(Long id, String jenis, String deskripsi, LocalDate tanggal, String status, Long userId, String userName, Long adminId, String adminNama) {
        this.id = id;
        this.jenis = jenis;
        this.deskripsi = deskripsi;
        this.tanggal = tanggal;
        this.status = status;
        this.userId = userId;
        this.userName = userName;
        this.adminId = adminId;
        this.adminNama = adminNama;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getAdminNama() {
        return adminNama;
    }

    public void setAdminNama(String adminNama) {
        this.adminNama = adminNama;
    }

}
