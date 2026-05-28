package com.TransPoin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reward")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nama;
    private Integer poinDibutuhkan;
    private String deskripsi;

    @JsonIgnore
    @OneToMany(mappedBy = "reward", cascade = CascadeType.ALL)
    private List<Penukaran> penukaranList;


    // Generated Constructors, Getters and Setters
    public Reward() {
    }

    public Reward(Long id, String nama, Integer poinDibutuhkan, String deskripsi, List<Penukaran> penukaranList) {
        this.id = id;
        this.nama = nama;
        this.poinDibutuhkan = poinDibutuhkan;
        this.deskripsi = deskripsi;
        this.penukaranList = penukaranList;
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

    public Integer getPoinDibutuhkan() {
        return poinDibutuhkan;
    }

    public void setPoinDibutuhkan(Integer poinDibutuhkan) {
        this.poinDibutuhkan = poinDibutuhkan;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public List<Penukaran> getPenukaranList() {
        return penukaranList;
    }

    public void setPenukaranList(List<Penukaran> penukaranList) {
        this.penukaranList = penukaranList;
    }

}
