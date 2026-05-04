package com.TransPoin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "perjalanan")
public class Perjalanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String asal;
    private String tujuan;
    private Double jarak;
    private Integer poinDidapat;
    private LocalDate tanggal;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @JsonIgnore
    @OneToMany(mappedBy = "perjalanan", cascade = CascadeType.ALL)
    private List<Feedback> feedbackList;


    // Generated Constructors, Getters and Setters
    public Perjalanan() {
    }

    public Perjalanan(Long id, String asal, String tujuan, Double jarak, Integer poinDidapat, LocalDate tanggal, User user, Admin admin, List<Feedback> feedbackList) {
        this.id = id;
        this.asal = asal;
        this.tujuan = tujuan;
        this.jarak = jarak;
        this.poinDidapat = poinDidapat;
        this.tanggal = tanggal;
        this.user = user;
        this.admin = admin;
        this.feedbackList = feedbackList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsal() {
        return asal;
    }

    public void setAsal(String asal) {
        this.asal = asal;
    }

    public String getTujuan() {
        return tujuan;
    }

    public void setTujuan(String tujuan) {
        this.tujuan = tujuan;
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

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

}
