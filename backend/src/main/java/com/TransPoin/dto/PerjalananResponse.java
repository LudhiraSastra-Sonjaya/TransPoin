package com.TransPoin.dto;

import com.TransPoin.enums.StatusPerjalanan;

import java.time.LocalDate;

public class PerjalananResponse {
    private Long id;
    private Double jarak;
    private Integer poinDidapat;
    private LocalDate tanggal;
    private String buktiPerjalanan;
    private String catatan;
    private StatusPerjalanan status;
    private Long userId;
    private String userName;
    private Long adminId;
    private String adminNama;
    private Long halteAsalId;
    private String halteAsalNama;
    private Long halteTujuanId;
    private String halteTujuanNama;

    // Constructors
    public PerjalananResponse() {
    }

    public PerjalananResponse(Long id, Double jarak, Integer poinDidapat, LocalDate tanggal,
                               String buktiPerjalanan, String catatan, StatusPerjalanan status,
                               Long userId, String userName, Long adminId, String adminNama,
                               Long halteAsalId, String halteAsalNama,
                               Long halteTujuanId, String halteTujuanNama) {
        this.id = id;
        this.jarak = jarak;
        this.poinDidapat = poinDidapat;
        this.tanggal = tanggal;
        this.buktiPerjalanan = buktiPerjalanan;
        this.catatan = catatan;
        this.status = status;
        this.userId = userId;
        this.userName = userName;
        this.adminId = adminId;
        this.adminNama = adminNama;
        this.halteAsalId = halteAsalId;
        this.halteAsalNama = halteAsalNama;
        this.halteTujuanId = halteTujuanId;
        this.halteTujuanNama = halteTujuanNama;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getJarak() { return jarak; }
    public void setJarak(Double jarak) { this.jarak = jarak; }

    public Integer getPoinDidapat() { return poinDidapat; }
    public void setPoinDidapat(Integer poinDidapat) { this.poinDidapat = poinDidapat; }

    public LocalDate getTanggal() { return tanggal; }
    public void setTanggal(LocalDate tanggal) { this.tanggal = tanggal; }

    public String getBuktiPerjalanan() { return buktiPerjalanan; }
    public void setBuktiPerjalanan(String buktiPerjalanan) { this.buktiPerjalanan = buktiPerjalanan; }

    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }

    public StatusPerjalanan getStatus() { return status; }
    public void setStatus(StatusPerjalanan status) { this.status = status; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }

    public String getAdminNama() { return adminNama; }
    public void setAdminNama(String adminNama) { this.adminNama = adminNama; }

    public Long getHalteAsalId() { return halteAsalId; }
    public void setHalteAsalId(Long halteAsalId) { this.halteAsalId = halteAsalId; }

    public String getHalteAsalNama() { return halteAsalNama; }
    public void setHalteAsalNama(String halteAsalNama) { this.halteAsalNama = halteAsalNama; }

    public Long getHalteTujuanId() { return halteTujuanId; }
    public void setHalteTujuanId(Long halteTujuanId) { this.halteTujuanId = halteTujuanId; }

    public String getHalteTujuanNama() { return halteTujuanNama; }
    public void setHalteTujuanNama(String halteTujuanNama) { this.halteTujuanNama = halteTujuanNama; }
}
