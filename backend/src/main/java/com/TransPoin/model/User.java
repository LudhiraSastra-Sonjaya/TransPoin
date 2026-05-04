package com.TransPoin.model;

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
    private Integer totalPoin = 0;

    @OneToMany(mappedBy = "user")
    private List<Perjalanan> perjalananList;

    @OneToMany(mappedBy = "user")
    private List<Penukaran> penukaranList;

    @OneToMany(mappedBy = "user")
    private List<Feedback> feedbackList;

    @OneToMany(mappedBy = "user")
    private List<Layanan> layananList;

    // getter setter
}