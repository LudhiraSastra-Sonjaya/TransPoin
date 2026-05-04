package com.TransPoin.dto;


import java.time.LocalDate;

public class PerjalananResponse {
    private Long id;
    private String asal;
    private String tujuan;
    private Double jarak;
    private Integer poinDidapat;
    private LocalDate tanggal;
    private Long userId;
    private String userName;
    private Long adminId;
    private String adminNama;


    // Generated Constructors, Getters and Setters
    public PerjalananResponse() {
    }

    public PerjalananResponse(Long id, String asal, String tujuan, Double jarak, Integer poinDidapat, LocalDate tanggal, Long userId, String userName, Long adminId, String adminNama) {
        this.id = id;
        this.asal = asal;
        this.tujuan = tujuan;
        this.jarak = jarak;
        this.poinDidapat = poinDidapat;
        this.tanggal = tanggal;
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

    public String getAsal() {
        return asal;
    }

    public void setAsal(String asal) {
        this.asal = asal;
    }

    public String getTujuan() {
        return tujuan;
    }

    public void setTujuan(String tujuan) {
        this.tujuan = tujuan;
    }

    public Double getJarak() {
        return jarak;
    }

    public void setJarak(Double jarak) {
        this.jarak = jarak;
    }

    public Integer getPoinDidapat() {
        return poinDidapat;
    }

    public void setPoinDidapat(Integer poinDidapat) {
        this.poinDidapat = poinDidapat;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
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
