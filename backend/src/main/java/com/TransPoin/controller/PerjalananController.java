package com.TransPoin.controller;

import com.TransPoin.dto.PerjalananRequest;
import com.TransPoin.dto.PerjalananResponse;
import com.TransPoin.dto.VerifikasiRequest;
import com.TransPoin.service.PerjalananService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/perjalanan")
@CrossOrigin(origins = "http://localhost:3000")
public class PerjalananController {

    private final PerjalananService perjalananService;

    public PerjalananController(PerjalananService perjalananService) {
        this.perjalananService = perjalananService;
    }

    @GetMapping
    public ResponseEntity<List<PerjalananResponse>> getAll() {
        return ResponseEntity.ok(perjalananService.getAllPerjalanan());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PerjalananResponse>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(perjalananService.getPerjalananByUserId(userId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<PerjalananResponse>> getPending() {
        return ResponseEntity.ok(perjalananService.getPerjalananPending());
    }

    // User submit perjalanan dengan upload bukti (multipart/form-data)
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> create(
            @RequestParam("userId") Long userId,
            @RequestParam("halteAsalId") Long halteAsalId,
            @RequestParam("halteTujuanId") Long halteTujuanId,
            @RequestParam(value = "tanggal", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tanggal,
            @RequestParam(value = "catatan", required = false) String catatan,
            @RequestParam("buktiPerjalanan") MultipartFile buktiPerjalanan) {
        try {
            PerjalananRequest request = new PerjalananRequest();
            request.setUserId(userId);
            request.setHalteAsalId(halteAsalId);
            request.setHalteTujuanId(halteTujuanId);
            request.setTanggal(tanggal);
            request.setCatatan(catatan);
            return ResponseEntity.ok(perjalananService.createPerjalanan(request, buktiPerjalanan));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admin verifikasi perjalanan
    @PutMapping("/{id}/verifikasi")
    public ResponseEntity<?> verifikasi(@PathVariable Long id, @RequestBody VerifikasiRequest request) {
        try {
            return ResponseEntity.ok(perjalananService.verifikasiPerjalanan(id, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
