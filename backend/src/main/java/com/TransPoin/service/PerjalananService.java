package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface PerjalananService {
    List<PerjalananResponse> getAllPerjalanan();
    List<PerjalananResponse> getPerjalananByUserId(Long userId);
    PerjalananResponse createPerjalanan(PerjalananRequest request);
}
