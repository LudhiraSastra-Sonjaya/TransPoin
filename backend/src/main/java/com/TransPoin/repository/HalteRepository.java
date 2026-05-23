package com.TransPoin.repository;

import com.TransPoin.model.Halte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HalteRepository extends JpaRepository<Halte, Long> {
    List<Halte> findByAktifTrue();
}
