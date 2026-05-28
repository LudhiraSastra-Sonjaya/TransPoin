package com.TransPoin.config;

import com.TransPoin.enums.Role;
import com.TransPoin.model.User;
import com.TransPoin.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Buat admin default jika belum ada admin di tabel users
        boolean adminExists = !userRepository.findByRole(Role.ADMIN).isEmpty();
        if (!adminExists) {
            User admin = new User();
            admin.setNama("Admin TransPoin");
            admin.setEmail("admin@transpoin.com");
            admin.setPassword("admin123");
            admin.setTotalPoin(0);
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("[DataInitializer] Admin default dibuat: admin@transpoin.com / admin123");
        }

        // Fix user lama yang totalPoin-nya NULL di database
        // dan set role USER untuk yang belum punya role
        List<User> users = userRepository.findAll();
        for (User user : users) {
            boolean changed = false;
            if (user.getTotalPoin() == null) {
                user.setTotalPoin(0);
                changed = true;
            }
            if (user.getRole() == null) {
                user.setRole(Role.USER);
                changed = true;
            }
            if (changed) {
                userRepository.save(user);
            }
        }
    }
}
