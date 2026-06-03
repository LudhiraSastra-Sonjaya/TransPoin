package com.TransPoin.model;

import com.TransPoin.enums.StatusPerjalanan;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "perjalanan")
public class Perjalanan extends BaseEntity {


    private Double jarak;
    private Integer poinDidapat;
    private LocalDate tanggal;
    private String buktiPerjalanan;
    private String catatan;

    @Enumerated(EnumType.STRING)
    private StatusPerjalanan status = StatusPerjalanan.PENDING;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /** Admin yang memverifikasi — disimpan di kolom admin_id (tetap sama agar tidak perlu migrasi kolom) */
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User approvedBy;

    @ManyToOne
    @JoinColumn(name = "halte_asal_id")
    private Halte halteAsal;

    @ManyToOne
    @JoinColumn(name = "halte_tujuan_id")
    private Halte halteTujuan;

    @JsonIgnore
    @OneToMany(mappedBy = "perjalanan", cascade = CascadeType.ALL)
    private List<Feedback> feedbackList;

    // Constructors
    public Perjalanan() {
    }

    public Perjalanan(Long id, Double jarak, Integer poinDidapat, LocalDate tanggal,
                      String buktiPerjalanan, String catatan, StatusPerjalanan status,
                      User user, User approvedBy, Halte halteAsal, Halte halteTujuan,
                      List<Feedback> feedbackList) {
        super(id);
        this.jarak = jarak;
        this.poinDidapat = poinDidapat;
        this.tanggal = tanggal;
        this.buktiPerjalanan = buktiPerjalanan;
        this.catatan = catatan;
        this.status = status;
        this.user = user;
        this.approvedBy = approvedBy;
        this.halteAsal = halteAsal;
        this.halteTujuan = halteTujuan;
        this.feedbackList = feedbackList;
    }

    @Override
    public String getEntityName() {
        return "Perjalanan";
    }


    public Double getJarak() {
        return jarak;
    }

    public void setJarak(Double jarak) {
        this.jarak = jarak;
    }

    public Integer getPoinDidapat() {
        return poinDidapat;
    }

    public void setPoinDidapat(Integer poinDidapat) {
        this.poinDidapat = poinDidapat;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public String getBuktiPerjalanan() {
        return buktiPerjalanan;
    }

    public void setBuktiPerjalanan(String buktiPerjalanan) {
        this.buktiPerjalanan = buktiPerjalanan;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public StatusPerjalanan getStatus() {
        return status;
    }

    public void setStatus(StatusPerjalanan status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Halte getHalteAsal() {
        return halteAsal;
    }

    public void setHalteAsal(Halte halteAsal) {
        this.halteAsal = halteAsal;
    }

    public Halte getHalteTujuan() {
        return halteTujuan;
    }

    public void setHalteTujuan(Halte halteTujuan) {
        this.halteTujuan = halteTujuan;
    }

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }
}
