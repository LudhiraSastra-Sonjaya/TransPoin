package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.model.Admin;
import com.TransPoin.repository.AdminRepository;
import com.TransPoin.service.AdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public AdminResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email admin tidak ditemukan"));
        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Password salah");
        }
        return mapToResponse(admin);
    }

    @Override
    public AdminResponse getById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin tidak ditemukan"));
        return mapToResponse(admin);
    }

    private AdminResponse mapToResponse(Admin admin) {
        return new AdminResponse(admin.getId(), admin.getNama(), admin.getEmail());
    }
}
