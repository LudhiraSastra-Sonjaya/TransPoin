package com.TransPoin.model;

import com.TransPoin.enums.StatusPenukaran;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "penukaran")
public class Penukaran extends BaseEntity {


    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusPenukaran status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "reward_id")
    private Reward reward;


    // Generated Constructors, Getters and Setters
    public Penukaran() {
    }

    public Penukaran(Long id, LocalDate tanggal, StatusPenukaran status, User user, Reward reward) {
        super(id);
        this.tanggal = tanggal;
        this.status = status;
        this.user = user;
        this.reward = reward;
    }

    @Override
    public String getEntityName() {
        return "Penukaran";
    }


    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public StatusPenukaran getStatus() {
        return status;
    }

    public void setStatus(StatusPenukaran status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Reward getReward() {
        return reward;
    }

    public void setReward(Reward reward) {
        this.reward = reward;
    }

}
