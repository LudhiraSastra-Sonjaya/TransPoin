package com.TransPoin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "halte")
public class Halte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String namaHalte;
    private String alamat;
    private Double latitude;
    private Double longitude;
    private Boolean aktif = true;

    // Constructors
    public Halte() {
    }

    public Halte(Long id, String namaHalte, String alamat, Double latitude, Double longitude, Boolean aktif) {
        this.id = id;
        this.namaHalte = namaHalte;
        this.alamat = alamat;
        this.latitude = latitude;
        this.longitude = longitude;
        this.aktif = aktif;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
