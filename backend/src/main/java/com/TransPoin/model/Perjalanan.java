package com.TransPoin.model;

import jakarta.persistence.*;
import java.time.LocalDate;

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

    // getter setter
}