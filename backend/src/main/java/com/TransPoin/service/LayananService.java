package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface LayananService {
    List<LayananResponse> getAllLayanan();
    List<LayananResponse> getLayananByUserId(Long userId);
    LayananResponse createLayanan(LayananRequest request);
    LayananResponse updateStatus(Long id, String status);
}
