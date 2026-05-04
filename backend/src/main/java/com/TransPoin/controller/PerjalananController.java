package com.TransPoin.controller;

import com.TransPoin.dto.*;
import com.TransPoin.service.PerjalananService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PerjalananRequest request) {
        try {
            return ResponseEntity.ok(perjalananService.createPerjalanan(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
