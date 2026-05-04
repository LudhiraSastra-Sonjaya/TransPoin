package com.TransPoin.repository;

import com.TransPoin.model.Layanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LayananRepository extends JpaRepository<Layanan, Long> {
    List<Layanan> findByUserId(Long userId);
}
