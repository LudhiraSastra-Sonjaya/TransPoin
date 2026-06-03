package com.TransPoin.model;

import jakarta.persistence.*;

/**
 * Abstract base class untuk semua entity di aplikasi TransPoin.
 *
 * Kelas ini merupakan implementasi Abstract Class dalam OOP:
 * - Tidak dapat diinstansiasi secara langsung (abstract)
 * - Menyediakan field 'id' yang diwarisi oleh semua entity turunannya
 * - Menggunakan @MappedSuperclass agar JPA memetakan field ini ke tabel masing-masing subclass
 *
 * Semua model (User, Perjalanan, Halte, dll) meng-extends kelas ini
 * sehingga tidak perlu mendefinisikan ulang field 'id' di setiap kelas.
 */
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Default constructor untuk JPA
    protected BaseEntity() {
    }

    protected BaseEntity(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Method abstract yang wajib diimplementasikan oleh setiap subclass.
     * Mengembalikan nama/label entitas untuk keperluan logging dan debugging.
     *
     * @return String nama entitas (contoh: "User", "Perjalanan", dll)
     */
    public abstract String getEntityName();
}
