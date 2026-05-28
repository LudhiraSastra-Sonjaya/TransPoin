package com.TransPoin.dto;


import java.time.LocalDate;

public class FeedbackResponse {
    private Long id;
    private Integer rating;
    private String komentar;
    private LocalDate tanggal;
    private String status;
    private Long userId;
    private String userName;
    private Long perjalananId;
    private String perjalananInfo;


    // Generated Constructors, Getters and Setters
    public FeedbackResponse() {
    }

    public FeedbackResponse(Long id, Integer rating, String komentar, LocalDate tanggal, String status, Long userId, String userName, Long perjalananId, String perjalananInfo) {
        this.id = id;
        this.rating = rating;
        this.komentar = komentar;
        this.tanggal = tanggal;
        this.status = status;
        this.userId = userId;
        this.userName = userName;
        this.perjalananId = perjalananId;
        this.perjalananInfo = perjalananInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
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

    public Long getPerjalananId() {
        return perjalananId;
    }

    public void setPerjalananId(Long perjalananId) {
        this.perjalananId = perjalananId;
    }

    public String getPerjalananInfo() {
        return perjalananInfo;
    }

    public void setPerjalananInfo(String perjalananInfo) {
        this.perjalananInfo = perjalananInfo;
    }

}
