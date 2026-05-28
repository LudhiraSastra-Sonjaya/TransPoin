package com.TransPoin.repository;

import com.TransPoin.enums.Role;
import com.TransPoin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * AdminRepository sekarang melakukan query ke tabel users dengan filter role=ADMIN.
 * Dipertahankan agar tidak perlu mengubah semua kelas yang inject AdminRepository.
 */
@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, Role role);
}
