package com.TransPoin.model;

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

    @OneToMany(mappedBy = "reward")
    private List<Penukaran> penukaranList;

    // getter setter
}