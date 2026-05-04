package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.enums.StatusPenukaran;
import com.TransPoin.model.Penukaran;
import com.TransPoin.model.Reward;
import com.TransPoin.model.User;
import com.TransPoin.repository.PenukaranRepository;
import com.TransPoin.repository.RewardRepository;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.PenukaranService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PenukaranServiceImpl implements PenukaranService {

    private final PenukaranRepository penukaranRepository;
    private final UserRepository userRepository;
    private final RewardRepository rewardRepository;

    public PenukaranServiceImpl(PenukaranRepository penukaranRepository,
                                 UserRepository userRepository,
                                 RewardRepository rewardRepository) {
        this.penukaranRepository = penukaranRepository;
        this.userRepository = userRepository;
        this.rewardRepository = rewardRepository;
    }

    @Override
    public PenukaranResponse tukarReward(TukarRewardRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
        Reward reward = rewardRepository.findById(request.getRewardId())
                .orElseThrow(() -> new RuntimeException("Reward tidak ditemukan"));

        if (user.getTotalPoin() < reward.getPoinDibutuhkan()) {
            throw new RuntimeException("Poin tidak cukup untuk menukar reward ini");
        }

        // Kurangi poin user
        user.setTotalPoin(user.getTotalPoin() - reward.getPoinDibutuhkan());
        userRepository.save(user);

        Penukaran penukaran = new Penukaran();
        penukaran.setTanggal(LocalDate.now());
        penukaran.setStatus(StatusPenukaran.BERHASIL);
        penukaran.setUser(user);
        penukaran.setReward(reward);

        return mapToResponse(penukaranRepository.save(penukaran));
    }

    @Override
    public List<PenukaranResponse> getByUserId(Long userId) {
        return penukaranRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PenukaranResponse> getAllPenukaran() {
        return penukaranRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PenukaranResponse mapToResponse(Penukaran p) {
        return new PenukaranResponse(
                p.getId(), p.getTanggal(),
                p.getStatus() != null ? p.getStatus().name() : null,
                p.getUser() != null ? p.getUser().getId() : null,
                p.getUser() != null ? p.getUser().getNama() : null,
                p.getReward() != null ? p.getReward().getId() : null,
                p.getReward() != null ? p.getReward().getNama() : null,
                p.getReward() != null ? p.getReward().getPoinDibutuhkan() : null
        );
    }
}
