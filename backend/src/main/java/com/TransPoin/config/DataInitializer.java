package com.TransPoin.config;

import com.TransPoin.model.Admin;
import com.TransPoin.model.User;
import com.TransPoin.repository.AdminRepository;
import com.TransPoin.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    public DataInitializer(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Buat admin default jika belum ada
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setNama("Admin TransPoin");
            admin.setEmail("admin@transpoin.com");
            admin.setPassword("admin123");
            adminRepository.save(admin);
        }

        // Fix user lama yang totalPoin-nya NULL di database
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getTotalPoin() == null) {
                user.setTotalPoin(0);
                userRepository.save(user);
            }
        }
    }
}
