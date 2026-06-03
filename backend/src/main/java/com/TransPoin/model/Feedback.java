package com.TransPoin.model;

import com.TransPoin.enums.StatusFeedback;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "feedback")
public class Feedback extends BaseEntity {


    private Integer rating;
    private String komentar;
    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusFeedback status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "perjalanan_id")
    private Perjalanan perjalanan;


    // Generated Constructors, Getters and Setters
    public Feedback() {
    }

    public Feedback(Long id, Integer rating, String komentar, LocalDate tanggal, StatusFeedback status, User user, Perjalanan perjalanan) {
        super(id);
        this.rating = rating;
        this.komentar = komentar;
        this.tanggal = tanggal;
        this.status = status;
        this.user = user;
        this.perjalanan = perjalanan;
    }

    @Override
    public String getEntityName() {
        return "Feedback";
    }


    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public StatusFeedback getStatus() {
        return status;
    }

    public void setStatus(StatusFeedback status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Perjalanan getPerjalanan() {
        return perjalanan;
    }

    public void setPerjalanan(Perjalanan perjalanan) {
        this.perjalanan = perjalanan;
    }

}
