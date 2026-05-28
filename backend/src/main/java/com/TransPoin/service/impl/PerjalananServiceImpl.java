package com.TransPoin.service.impl;

import com.TransPoin.dto.PerjalananRequest;
import com.TransPoin.dto.PerjalananResponse;
import com.TransPoin.dto.VerifikasiRequest;
import com.TransPoin.enums.Role;
import com.TransPoin.enums.StatusPerjalanan;
import com.TransPoin.model.Halte;
import com.TransPoin.model.Perjalanan;
import com.TransPoin.model.User;
import com.TransPoin.repository.HalteRepository;
import com.TransPoin.repository.PerjalananRepository;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.PerjalananService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PerjalananServiceImpl implements PerjalananService {

    private final PerjalananRepository perjalananRepository;
    private final UserRepository userRepository;
    private final HalteRepository halteRepository;

    @Value("${upload.dir:uploads/bukti}")
    private String uploadDir;

    public PerjalananServiceImpl(PerjalananRepository perjalananRepository,
                                  UserRepository userRepository,
                                  HalteRepository halteRepository) {
        this.perjalananRepository = perjalananRepository;
        this.userRepository = userRepository;
        this.halteRepository = halteRepository;
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
    public List<PerjalananResponse> getPerjalananPending() {
        return perjalananRepository.findByStatus(StatusPerjalanan.PENDING).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PerjalananResponse createPerjalanan(PerjalananRequest request, MultipartFile bukti) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Halte halteAsal = halteRepository.findById(request.getHalteAsalId())
                .orElseThrow(() -> new RuntimeException("Halte asal tidak ditemukan"));

        Halte halteTujuan = halteRepository.findById(request.getHalteTujuanId())
                .orElseThrow(() -> new RuntimeException("Halte tujuan tidak ditemukan"));

        if (request.getHalteAsalId().equals(request.getHalteTujuanId())) {
            throw new RuntimeException("Halte asal dan tujuan tidak boleh sama");
        }

        // Simpan file bukti
        String buktiPath = null;
        if (bukti != null && !bukti.isEmpty()) {
            buktiPath = saveBuktiFile(bukti);
        } else {
            throw new RuntimeException("Bukti perjalanan wajib diupload");
        }

        // Hitung jarak berdasarkan koordinat halte (jika ada), atau default 1 km per halte
        double jarak = hitungJarak(halteAsal, halteTujuan);
        int poin = (int) Math.round(jarak);

        Perjalanan p = new Perjalanan();
        p.setHalteAsal(halteAsal);
        p.setHalteTujuan(halteTujuan);
        p.setJarak(jarak);
        p.setPoinDidapat(poin);
        p.setTanggal(request.getTanggal() != null ? request.getTanggal() : LocalDate.now());
        p.setBuktiPerjalanan(buktiPath);
        p.setCatatan(request.getCatatan());
        p.setStatus(StatusPerjalanan.PENDING);
        p.setUser(user);

        return mapToResponse(perjalananRepository.save(p));
    }

    @Override
    public PerjalananResponse verifikasiPerjalanan(Long id, VerifikasiRequest request) {
        Perjalanan perjalanan = perjalananRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perjalanan tidak ditemukan"));

        if (perjalanan.getStatus() != StatusPerjalanan.PENDING) {
            throw new RuntimeException("Perjalanan sudah diverifikasi sebelumnya");
        }

        // Cari admin (User dengan role ADMIN) berdasarkan adminId
        User adminUser = userRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin tidak ditemukan"));

        if (adminUser.getRole() != Role.ADMIN) {
            throw new RuntimeException("User yang melakukan verifikasi harus memiliki role ADMIN");
        }

        perjalanan.setApprovedBy(adminUser);

        if ("APPROVE".equalsIgnoreCase(request.getAction())) {
            perjalanan.setStatus(StatusPerjalanan.APPROVED);
            // Tambah poin ke user (handle null totalPoin untuk user lama)
            User user = perjalanan.getUser();
            int poinSekarang = user.getTotalPoin() != null ? user.getTotalPoin() : 0;
            int poinBaru = perjalanan.getPoinDidapat() != null ? perjalanan.getPoinDidapat() : 0;
            user.setTotalPoin(poinSekarang + poinBaru);
            userRepository.save(user);
        } else if ("REJECT".equalsIgnoreCase(request.getAction())) {
            perjalanan.setStatus(StatusPerjalanan.REJECTED);
        } else {
            throw new RuntimeException("Action tidak valid. Gunakan APPROVE atau REJECT");
        }

        return mapToResponse(perjalananRepository.save(perjalanan));
    }

    private String saveBuktiFile(MultipartFile file) {
        try {
            // Validasi tipe file
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("File harus berupa gambar (jpg, png, jpeg)");
            }

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".jpg";
            String filename = UUID.randomUUID().toString() + extension;

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);

            return uploadDir + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Gagal menyimpan file bukti: " + e.getMessage());
        }
    }

    private double hitungJarak(Halte asal, Halte tujuan) {
        // Jika kedua halte punya koordinat, hitung jarak Haversine
        if (asal.getLatitude() != null && asal.getLongitude() != null
                && tujuan.getLatitude() != null && tujuan.getLongitude() != null) {
            return hitungHaversine(asal.getLatitude(), asal.getLongitude(),
                    tujuan.getLatitude(), tujuan.getLongitude());
        }
        // Default: 2 km jika tidak ada koordinat
        return 2.0;
    }

    private double hitungHaversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius bumi dalam km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10.0) / 10.0;
    }

    private PerjalananResponse mapToResponse(Perjalanan p) {
        return new PerjalananResponse(
                p.getId(),
                p.getJarak(),
                p.getPoinDidapat(),
                p.getTanggal(),
                p.getBuktiPerjalanan(),
                p.getCatatan(),
                p.getStatus(),
                p.getUser() != null ? p.getUser().getId() : null,
                p.getUser() != null ? p.getUser().getNama() : null,
                p.getApprovedBy() != null ? p.getApprovedBy().getId() : null,
                p.getApprovedBy() != null ? p.getApprovedBy().getNama() : null,
                p.getHalteAsal() != null ? p.getHalteAsal().getId() : null,
                p.getHalteAsal() != null ? p.getHalteAsal().getNamaHalte() : null,
                p.getHalteTujuan() != null ? p.getHalteTujuan().getId() : null,
                p.getHalteTujuan() != null ? p.getHalteTujuan().getNamaHalte() : null
        );
    }
}
