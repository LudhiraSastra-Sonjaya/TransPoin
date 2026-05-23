package com.TransPoin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nama;
    private String email;
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Perjalanan> perjalananList;

    @JsonIgnore
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Layanan> layananList;

    // Constructors
    public Admin() {
    }

    public Admin(Long id, String nama, String email, String password,
                 List<Perjalanan> perjalananList, List<Layanan> layananList) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.password = password;
        this.perjalananList = perjalananList;
        this.layananList = layananList;
    }

    // Getters and Setters
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

    public List<Perjalanan> getPerjalananList() {
        return perjalananList;
    }

    public void setPerjalananList(List<Perjalanan> perjalananList) {
        this.perjalananList = perjalananList;
    }

    public List<Layanan> getLayananList() {
        return layananList;
    }

    public void setLayananList(List<Layanan> layananList) {
        this.layananList = layananList;
    }
}
