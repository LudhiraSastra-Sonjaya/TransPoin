package com.TransPoin.model;

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

    @OneToMany(mappedBy = "admin")
    private List<Perjalanan> perjalananList;

    @OneToMany(mappedBy = "admin")
    private List<Layanan> layananList;

    // getter setter
}