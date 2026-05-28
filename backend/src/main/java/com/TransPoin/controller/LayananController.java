package com.TransPoin.controller;

import com.TransPoin.dto.*;
import com.TransPoin.service.LayananService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/layanan")
@CrossOrigin(origins = "http://localhost:3000")
public class LayananController {

    private final LayananService layananService;

    public LayananController(LayananService layananService) {
        this.layananService = layananService;
    }

    @GetMapping
    public ResponseEntity<List<LayananResponse>> getAll() {
        return ResponseEntity.ok(layananService.getAllLayanan());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LayananResponse>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(layananService.getLayananByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody LayananRequest request) {
        try {
            return ResponseEntity.ok(layananService.createLayanan(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        try {
            return ResponseEntity.ok(layananService.updateStatus(id, request.getStatus()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
