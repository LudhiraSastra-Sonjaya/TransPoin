package com.TransPoin.service.impl;

import com.TransPoin.dto.HalteRequest;
import com.TransPoin.dto.HalteResponse;
import com.TransPoin.model.Halte;
import com.TransPoin.repository.HalteRepository;
import com.TransPoin.service.HalteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HalteServiceImpl implements HalteService {

    private final HalteRepository halteRepository;

    public HalteServiceImpl(HalteRepository halteRepository) {
        this.halteRepository = halteRepository;
    }

    @Override
    public List<HalteResponse> getAllHalte() {
        return halteRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HalteResponse> getHalteAktif() {
        return halteRepository.findByAktifTrue().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public HalteResponse getById(Long id) {
        Halte halte = halteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Halte tidak ditemukan dengan id: " + id));
        return mapToResponse(halte);
    }

    @Override
    public HalteResponse createHalte(HalteRequest request) {
        Halte halte = new Halte();
        halte.setNamaHalte(request.getNamaHalte());
        halte.setAlamat(request.getAlamat());
        halte.setLatitude(request.getLatitude());
        halte.setLongitude(request.getLongitude());
        halte.setAktif(request.getAktif() != null ? request.getAktif() : true);
        return mapToResponse(halteRepository.save(halte));
    }

    @Override
    public HalteResponse updateHalte(Long id, HalteRequest request) {
        Halte halte = halteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Halte tidak ditemukan dengan id: " + id));
        halte.setNamaHalte(request.getNamaHalte());
        halte.setAlamat(request.getAlamat());
        halte.setLatitude(request.getLatitude());
        halte.setLongitude(request.getLongitude());
        if (request.getAktif() != null) {
            halte.setAktif(request.getAktif());
        }
        return mapToResponse(halteRepository.save(halte));
    }

    @Override
    public void deleteHalte(Long id) {
        if (!halteRepository.existsById(id)) {
            throw new RuntimeException("Halte tidak ditemukan dengan id: " + id);
        }
        halteRepository.deleteById(id);
    }

    private HalteResponse mapToResponse(Halte halte) {
        return new HalteResponse(
                halte.getId(),
                halte.getNamaHalte(),
                halte.getAlamat(),
                halte.getLatitude(),
                halte.getLongitude(),
                halte.getAktif()
        );
    }
}
