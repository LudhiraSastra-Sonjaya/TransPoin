package com.TransPoin.dto;


public class FeedbackRequest {
    private Integer rating;
    private String komentar;
    private Long userId;
    private Long perjalananId;


    // Generated Constructors, Getters and Setters
    public FeedbackRequest() {
    }

    public FeedbackRequest(Integer rating, String komentar, Long userId, Long perjalananId) {
        this.rating = rating;
        this.komentar = komentar;
        this.userId = userId;
        this.perjalananId = perjalananId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPerjalananId() {
        return perjalananId;
    }

    public void setPerjalananId(Long perjalananId) {
        this.perjalananId = perjalananId;
    }

}
