package com.TransPoin.service;

import com.TransPoin.dto.HalteRequest;
import com.TransPoin.dto.HalteResponse;

import java.util.List;

public interface HalteService {
    List<HalteResponse> getAllHalte();
    List<HalteResponse> getHalteAktif();
    HalteResponse getById(Long id);
    HalteResponse createHalte(HalteRequest request);
    HalteResponse updateHalte(Long id, HalteRequest request);
    void deleteHalte(Long id);
}
