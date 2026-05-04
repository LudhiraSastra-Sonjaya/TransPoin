package com.TransPoin.model;

import com.TransPoin.enums.StatusFeedback;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rating;
    private String komentar;
    private LocalDate tanggal;

    @Enumerated(EnumType.STRING)
    private StatusFeedback status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "perjalanan_id")
    private Perjalanan perjalanan;

    // getter setter
}