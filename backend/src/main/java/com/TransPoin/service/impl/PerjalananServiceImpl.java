package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.model.Admin;
import com.TransPoin.model.Perjalanan;
import com.TransPoin.model.User;
import com.TransPoin.repository.AdminRepository;
import com.TransPoin.repository.PerjalananRepository;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.PerjalananService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PerjalananServiceImpl implements PerjalananService {

    private final PerjalananRepository perjalananRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    public PerjalananServiceImpl(PerjalananRepository perjalananRepository,
                                  UserRepository userRepository,
                                  AdminRepository adminRepository) {
        this.perjalananRepository = perjalananRepository;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public List<PerjalananResponse> getAllPerjalanan() {
        return perjalananRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PerjalananResponse> getPerjalananByUserId(Long userId) {
        return perjalananRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PerjalananResponse createPerjalanan(PerjalananRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
        Admin admin = adminRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin tidak ditemukan"));

        // Hitung poin: 1 poin per km (dibulatkan)
        int poin = (int) Math.round(request.getJarak());

        Perjalanan p = new Perjalanan();
        p.setAsal(request.getAsal());
        p.setTujuan(request.getTujuan());
        p.setJarak(request.getJarak());
        p.setPoinDidapat(poin);
        p.setTanggal(request.getTanggal() != null ? request.getTanggal() : LocalDate.now());
        p.setUser(user);
        p.setAdmin(admin);

        Perjalanan saved = perjalananRepository.save(p);

        // Update total poin user
        user.setTotalPoin(user.getTotalPoin() + poin);
        userRepository.save(user);

        return mapToResponse(saved);
    }

    private PerjalananResponse mapToResponse(Perjalanan p) {
        return new PerjalananResponse(
                p.getId(), p.getAsal(), p.getTujuan(), p.getJarak(), p.getPoinDidapat(), p.getTanggal(),
                p.getUser() != null ? p.getUser().getId() : null,
                p.getUser() != null ? p.getUser().getNama() : null,
                p.getAdmin() != null ? p.getAdmin().getId() : null,
                p.getAdmin() != null ? p.getAdmin().getNama() : null
        );
    }
}
