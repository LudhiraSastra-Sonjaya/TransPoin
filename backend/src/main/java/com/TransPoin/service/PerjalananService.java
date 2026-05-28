package com.TransPoin.service;

import com.TransPoin.dto.PerjalananRequest;
import com.TransPoin.dto.PerjalananResponse;
import com.TransPoin.dto.VerifikasiRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PerjalananService {
    List<PerjalananResponse> getAllPerjalanan();
    List<PerjalananResponse> getPerjalananByUserId(Long userId);
    List<PerjalananResponse> getPerjalananPending();
    PerjalananResponse createPerjalanan(PerjalananRequest request, MultipartFile bukti);
    PerjalananResponse verifikasiPerjalanan(Long id, VerifikasiRequest request);
}
