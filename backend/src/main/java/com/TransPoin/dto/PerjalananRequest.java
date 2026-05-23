package com.TransPoin.dto;

import java.time.LocalDate;

public class PerjalananRequest {
    private Long halteAsalId;
    private Long halteTujuanId;
    private LocalDate tanggal;
    private Long userId;
    private String catatan;
    // buktiPerjalanan dikirim via multipart, bukan JSON

    // Constructors
    public PerjalananRequest() {
    }

    public PerjalananRequest(Long halteAsalId, Long halteTujuanId, LocalDate tanggal, Long userId, String catatan) {
        this.halteAsalId = halteAsalId;
        this.halteTujuanId = halteTujuanId;
        this.tanggal = tanggal;
        this.userId = userId;
        this.catatan = catatan;
    }

    // Getters and Setters
    public Long getHalteAsalId() {
        return halteAsalId;
    }

    public void setHalteAsalId(Long halteAsalId) {
        this.halteAsalId = halteAsalId;
    }

    public Long getHalteTujuanId() {
        return halteTujuanId;
    }

    public void setHalteTujuanId(Long halteTujuanId) {
        this.halteTujuanId = halteTujuanId;
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

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }
}
