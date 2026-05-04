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

    // getter setter
}