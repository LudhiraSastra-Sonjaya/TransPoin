package com.TransPoin.dto;


import java.time.LocalDate;

public class PenukaranResponse {
    private Long id;
    private LocalDate tanggal;
    private String status;
    private Long userId;
    private String userName;
    private Long rewardId;
    private String rewardNama;
    private Integer poinDibutuhkan;


    // Generated Constructors, Getters and Setters
    public PenukaranResponse() {
    }

    public PenukaranResponse(Long id, LocalDate tanggal, String status, Long userId, String userName, Long rewardId, String rewardNama, Integer poinDibutuhkan) {
        this.id = id;
        this.tanggal = tanggal;
        this.status = status;
        this.userId = userId;
        this.userName = userName;
        this.rewardId = rewardId;
        this.rewardNama = rewardNama;
        this.poinDibutuhkan = poinDibutuhkan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getRewardId() {
        return rewardId;
    }

    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

    public String getRewardNama() {
        return rewardNama;
    }

    public void setRewardNama(String rewardNama) {
        this.rewardNama = rewardNama;
    }

    public Integer getPoinDibutuhkan() {
        return poinDibutuhkan;
    }

    public void setPoinDibutuhkan(Integer poinDibutuhkan) {
        this.poinDibutuhkan = poinDibutuhkan;
    }

}
