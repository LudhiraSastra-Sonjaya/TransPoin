package com.TransPoin.model;

import com.TransPoin.enums.StatusLayanan;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "layanan")
public class Layanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jenis;
    private String deskripsi;
    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusLayanan status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;


    // Generated Constructors, Getters and Setters
    public Layanan() {
    }

    public Layanan(Long id, String jenis, String deskripsi, LocalDate tanggal, StatusLayanan status, User user, Admin admin) {
        this.id = id;
        this.jenis = jenis;
        this.deskripsi = deskripsi;
        this.tanggal = tanggal;
        this.status = status;
        this.user = user;
        this.admin = admin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

}
