package com.TransPoin.model;

import com.TransPoin.enums.StatusPenukaran;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "penukaran")
public class Penukaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusPenukaran status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "reward_id")
    private Reward reward;

    // getter setter
}