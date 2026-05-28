package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.enums.Role;
import com.TransPoin.model.User;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.AdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    public AdminServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AdminResponse login(AdminLoginRequest request) {
        User admin = userRepository.findByEmailAndRole(request.getEmail(), Role.ADMIN)
                .orElseThrow(() -> new RuntimeException("Email admin tidak ditemukan"));
        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Password salah");
        }
        return mapToResponse(admin);
    }

    @Override
    public AdminResponse getById(Long id) {
        User admin = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin tidak ditemukan"));
        return mapToResponse(admin);
    }

    private AdminResponse mapToResponse(User admin) {
        return new AdminResponse(admin.getId(), admin.getNama(), admin.getEmail(), "ADMIN");
    }
}
