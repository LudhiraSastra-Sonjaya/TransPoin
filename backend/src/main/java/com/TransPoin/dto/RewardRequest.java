package com.TransPoin.dto;


public class RewardRequest {
    private String nama;
    private Integer poinDibutuhkan;
    private String deskripsi;


    // Generated Constructors, Getters and Setters
    public RewardRequest() {
    }

    public RewardRequest(String nama, Integer poinDibutuhkan, String deskripsi) {
        this.nama = nama;
        this.poinDibutuhkan = poinDibutuhkan;
        this.deskripsi = deskripsi;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public Integer getPoinDibutuhkan() {
        return poinDibutuhkan;
    }

    public void setPoinDibutuhkan(Integer poinDibutuhkan) {
        this.poinDibutuhkan = poinDibutuhkan;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

}
