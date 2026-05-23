package com.TransPoin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nama;
    private String email;
    private String password;

    @Column(name = "total_poin", columnDefinition = "INT DEFAULT 0")
    private Integer totalPoin = 0;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Perjalanan> perjalananList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Penukaran> penukaranList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Feedback> feedbackList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Layanan> layananList;


    // Generated Constructors, Getters and Setters
    public User() {
    }

    public User(Long id, String nama, String email, String password, Integer totalPoin, List<Perjalanan> perjalananList, List<Penukaran> penukaranList, List<Feedback> feedbackList, List<Layanan> layananList) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.password = password;
        this.totalPoin = totalPoin;
        this.perjalananList = perjalananList;
        this.penukaranList = penukaranList;
        this.feedbackList = feedbackList;
        this.layananList = layananList;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getTotalPoin() {
        return totalPoin != null ? totalPoin : 0;
    }

    public void setTotalPoin(Integer totalPoin) {
        this.totalPoin = totalPoin;
    }

    public List<Perjalanan> getPerjalananList() {
        return perjalananList;
    }

    public void setPerjalananList(List<Perjalanan> perjalananList) {
        this.perjalananList = perjalananList;
    }

    public List<Penukaran> getPenukaranList() {
        return penukaranList;
    }

    public void setPenukaranList(List<Penukaran> penukaranList) {
        this.penukaranList = penukaranList;
    }

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

    public List<Layanan> getLayananList() {
        return layananList;
    }

    public void setLayananList(List<Layanan> layananList) {
        this.layananList = layananList;
    }

}
