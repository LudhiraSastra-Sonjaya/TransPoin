package com.TransPoin.repository;

import com.TransPoin.model.Perjalanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerjalananRepository extends JpaRepository<Perjalanan, Long> {
    List<Perjalanan> findByUserId(Long userId);
}
