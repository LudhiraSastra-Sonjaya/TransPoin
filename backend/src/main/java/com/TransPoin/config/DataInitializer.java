package com.TransPoin.config;

import com.TransPoin.model.Admin;
import com.TransPoin.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;

    public DataInitializer(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public void run(String... args) {
        // Seed admin default jika belum ada
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setNama("Admin TransPoin");
            admin.setEmail("admin@transpoin.com");
            admin.setPassword("admin123");
            adminRepository.save(admin);
            System.out.println("✅ Admin default berhasil dibuat: admin@transpoin.com / admin123");
        }
    }
}
