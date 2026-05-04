package com.TransPoin.controller;

import com.TransPoin.dto.*;
import com.TransPoin.service.PenukaranService;
import com.TransPoin.service.RewardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reward")
@CrossOrigin(origins = "http://localhost:3000")
public class RewardController {

    private final RewardService rewardService;
    private final PenukaranService penukaranService;

    public RewardController(RewardService rewardService, PenukaranService penukaranService) {
        this.rewardService = rewardService;
        this.penukaranService = penukaranService;
    }

    @GetMapping
    public ResponseEntity<List<RewardResponse>> getAll() {
        return ResponseEntity.ok(rewardService.getAllReward());
    }

    @PostMapping
    public ResponseEntity<?> createReward(@RequestBody RewardRequest request) {
        try {
            return ResponseEntity.ok(rewardService.createReward(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/tukar")
    public ResponseEntity<?> tukar(@RequestBody TukarRewardRequest request) {
        try {
            return ResponseEntity.ok(penukaranService.tukarReward(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/penukaran")
    public ResponseEntity<List<PenukaranResponse>> getAllPenukaran() {
        return ResponseEntity.ok(penukaranService.getAllPenukaran());
    }

    @GetMapping("/penukaran/user/{userId}")
    public ResponseEntity<List<PenukaranResponse>> getPenukaranByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(penukaranService.getByUserId(userId));
    }
}
