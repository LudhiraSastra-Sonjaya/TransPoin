package com.TransPoin.dto;

public class VerifikasiRequest {
    private Long adminId;
    private String action; // "APPROVE" or "REJECT"

    // Constructors
    public VerifikasiRequest() {
    }

    public VerifikasiRequest(Long adminId, String action) {
        this.adminId = adminId;
        this.action = action;
    }

    // Getters and Setters
    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
