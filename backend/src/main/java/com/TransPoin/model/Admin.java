package com.TransPoin.model;

/**
 * Admin class sudah digabungkan ke User dengan field role = ADMIN.
 * File ini dipertahankan untuk keperluan referensi saja (tidak lagi menjadi JPA Entity).
 * @deprecated Gunakan User dengan Role.ADMIN sebagai gantinya.
 */
@Deprecated
public class Admin {
    // Sudah tidak digunakan sebagai JPA Entity.
    // Admin sekarang adalah User dengan role = ADMIN di tabel users.
}
