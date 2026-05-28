package com.TransPoin.repository;

import com.TransPoin.model.Penukaran;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PenukaranRepository extends JpaRepository<Penukaran, Long> {
    List<Penukaran> findByUserId(Long userId);
}
