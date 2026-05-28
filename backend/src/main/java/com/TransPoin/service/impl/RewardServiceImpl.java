package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.model.Reward;
import com.TransPoin.repository.RewardRepository;
import com.TransPoin.service.RewardService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RewardServiceImpl implements RewardService {

    private final RewardRepository rewardRepository;

    public RewardServiceImpl(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    @Override
    public List<RewardResponse> getAllReward() {
        return rewardRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RewardResponse createReward(RewardRequest request) {
        Reward reward = new Reward();
        reward.setNama(request.getNama());
        reward.setPoinDibutuhkan(request.getPoinDibutuhkan());
        reward.setDeskripsi(request.getDeskripsi());
        return mapToResponse(rewardRepository.save(reward));
    }

    @Override
    public RewardResponse updateReward(Long id, RewardRequest request) {
        Reward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward tidak ditemukan dengan id: " + id));
        reward.setNama(request.getNama());
        reward.setPoinDibutuhkan(request.getPoinDibutuhkan());
        reward.setDeskripsi(request.getDeskripsi());
        return mapToResponse(rewardRepository.save(reward));
    }

    @Override
    public void deleteReward(Long id) {
        Reward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward tidak ditemukan dengan id: " + id));
        rewardRepository.delete(reward);
    }

    private RewardResponse mapToResponse(Reward r) {
        return new RewardResponse(r.getId(), r.getNama(), r.getPoinDibutuhkan(), r.getDeskripsi());
    }
}
