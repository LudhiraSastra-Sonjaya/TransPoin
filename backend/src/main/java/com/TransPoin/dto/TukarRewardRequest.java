package com.TransPoin.dto;


public class TukarRewardRequest {
    private Long userId;
    private Long rewardId;


    // Generated Constructors, Getters and Setters
    public TukarRewardRequest() {
    }

    public TukarRewardRequest(Long userId, Long rewardId) {
        this.userId = userId;
        this.rewardId = rewardId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRewardId() {
        return rewardId;
    }

    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

}
