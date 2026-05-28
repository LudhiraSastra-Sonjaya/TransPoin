package com.TransPoin.dto;


public class RewardResponse {
    private Long id;
    private String nama;
    private Integer poinDibutuhkan;
    private String deskripsi;


    // Generated Constructors, Getters and Setters
    public RewardResponse() {
    }

    public RewardResponse(Long id, String nama, Integer poinDibutuhkan, String deskripsi) {
        this.id = id;
        this.nama = nama;
        this.poinDibutuhkan = poinDibutuhkan;
        this.deskripsi = deskripsi;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
