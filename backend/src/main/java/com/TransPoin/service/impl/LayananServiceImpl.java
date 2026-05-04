package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.enums.StatusLayanan;
import com.TransPoin.model.Layanan;
import com.TransPoin.model.User;
import com.TransPoin.repository.LayananRepository;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.LayananService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LayananServiceImpl implements LayananService {

    private final LayananRepository layananRepository;
    private final UserRepository userRepository;

    public LayananServiceImpl(LayananRepository layananRepository,
                               UserRepository userRepository) {
        this.layananRepository = layananRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<LayananResponse> getAllLayanan() {
        return layananRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<LayananResponse> getLayananByUserId(Long userId) {
        return layananRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LayananResponse createLayanan(LayananRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Layanan layanan = new Layanan();
        layanan.setJenis(request.getJenis());
        layanan.setDeskripsi(request.getDeskripsi());
        layanan.setTanggal(LocalDate.now());
        layanan.setStatus(StatusLayanan.PENDING);
        layanan.setUser(user);

        return mapToResponse(layananRepository.save(layanan));
    }

    @Override
    public LayananResponse updateStatus(Long id, String status) {
        Layanan layanan = layananRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Layanan tidak ditemukan"));
        layanan.setStatus(StatusLayanan.valueOf(status));
        return mapToResponse(layananRepository.save(layanan));
    }

    private LayananResponse mapToResponse(Layanan l) {
        return new LayananResponse(
                l.getId(), l.getJenis(), l.getDeskripsi(), l.getTanggal(),
                l.getStatus() != null ? l.getStatus().name() : null,
                l.getUser() != null ? l.getUser().getId() : null,
                l.getUser() != null ? l.getUser().getNama() : null,
                l.getAdmin() != null ? l.getAdmin().getId() : null,
                l.getAdmin() != null ? l.getAdmin().getNama() : null
        );
    }
}
