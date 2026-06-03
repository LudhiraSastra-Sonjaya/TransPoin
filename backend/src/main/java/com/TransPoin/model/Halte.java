package com.TransPoin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "halte")
public class Halte extends BaseEntity {


    private String namaHalte;
    private String alamat;
    private Double latitude;
    private Double longitude;
    private Boolean aktif = true;

    // Constructors
    public Halte() {
    }

    public Halte(Long id, String namaHalte, String alamat, Double latitude, Double longitude, Boolean aktif) {
        super(id);
        this.namaHalte = namaHalte;
        this.alamat = alamat;
        this.latitude = latitude;
        this.longitude = longitude;
        this.aktif = aktif;
    }

    @Override
    public String getEntityName() {
        return "Halte";
    }

    // Getters and Setters
    public String getNamaHalte() {
        return namaHalte;
    }

    public void setNamaHalte(String namaHalte) {
        this.namaHalte = namaHalte;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Boolean getAktif() {
        return aktif;
    }

    public void setAktif(Boolean aktif) {
        this.aktif = aktif;
    }
}
