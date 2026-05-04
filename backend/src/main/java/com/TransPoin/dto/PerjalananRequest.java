package com.TransPoin.dto;

import java.time.LocalDate;

public class PerjalananRequest {
    private String asal;
    private String tujuan;
    private Double jarak;
    private LocalDate tanggal;
    private Long userId;
    private Long adminId;


    // Generated Constructors, Getters and Setters
    public PerjalananRequest() {
    }

    public PerjalananRequest(String asal, String tujuan, Double jarak, LocalDate tanggal, Long userId, Long adminId) {
        this.asal = asal;
        this.tujuan = tujuan;
        this.jarak = jarak;
        this.tanggal = tanggal;
        this.userId = userId;
        this.adminId = adminId;
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

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

}
