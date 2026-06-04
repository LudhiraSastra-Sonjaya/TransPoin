package com.TransPoin.controller;

import com.TransPoin.dto.HalteRequest;
import com.TransPoin.dto.HalteResponse;
import com.TransPoin.service.HalteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HalteController {

    private final HalteService halteService;

    public HalteController(HalteService halteService) {
        this.halteService = halteService;
    }

    // Public: semua user bisa lihat halte aktif
    @GetMapping("/api/halte")
    public ResponseEntity<List<HalteResponse>> getHalteAktif() {
        return ResponseEntity.ok(halteService.getHalteAktif());
    }

    // Admin: lihat semua halte (termasuk nonaktif)
    @GetMapping("/api/admin/halte")
    public ResponseEntity<List<HalteResponse>> getAllHalte() {
        return ResponseEntity.ok(halteService.getAllHalte());
    }

    @PostMapping("/api/admin/halte")
    public ResponseEntity<?> createHalte(@RequestBody HalteRequest request) {
        try {
            return ResponseEntity.ok(halteService.createHalte(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/api/admin/halte/{id}")
    public ResponseEntity<?> updateHalte(@PathVariable Long id, @RequestBody HalteRequest request) {
        try {
            return ResponseEntity.ok(halteService.updateHalte(id, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/api/admin/halte/{id}")
    public ResponseEntity<?> deleteHalte(@PathVariable Long id) {
        try {
            halteService.deleteHalte(id);
            return ResponseEntity.ok("Halte berhasil dihapus");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
