package com.TransPoin.repository;

import com.TransPoin.enums.StatusPerjalanan;
import com.TransPoin.model.Perjalanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerjalananRepository extends JpaRepository<Perjalanan, Long> {
    List<Perjalanan> findByUserId(Long userId);
    List<Perjalanan> findByStatus(StatusPerjalanan status);
    List<Perjalanan> findByUserIdAndStatus(Long userId, StatusPerjalanan status);
    long countByStatus(StatusPerjalanan status);
}
