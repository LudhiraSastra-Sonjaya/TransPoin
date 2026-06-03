package com.TransPoin.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.TransPoin.enums.StatusLayanan;

@Entity
@Table(name = "layanan")
public class Layanan extends BaseEntity {


    private String jenis;
    private String deskripsi;
    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusLayanan status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /** Admin yang menangani — kolom DB tetap admin_id */
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User handledBy;

    // Generated Constructors, Getters and Setters
    public Layanan() {
    }

    public Layanan(Long id, String jenis, String deskripsi, LocalDate tanggal, StatusLayanan status, User user,
            User handledBy) {
        super(id);
        this.jenis = jenis;
        this.deskripsi = deskripsi;
        this.tanggal = tanggal;
        this.status = status;
        this.user = user;
        this.handledBy = handledBy;
    }

    @Override
    public String getEntityName() {
        return "Layanan";
    }


    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public StatusLayanan getStatus() {
        return status;
    }

    public void setStatus(StatusLayanan status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getHandledBy() {
        return handledBy;
    }

    public void setHandledBy(User handledBy) {
        this.handledBy = handledBy;
    }

}
