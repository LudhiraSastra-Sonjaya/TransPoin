package com.TransPoin.service.impl;

import com.TransPoin.dto.DashboardResponse;
import com.TransPoin.enums.StatusPenukaran;
import com.TransPoin.model.Penukaran;
import com.TransPoin.repository.*;
import com.TransPoin.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final PerjalananRepository perjalananRepository;
    private final FeedbackRepository feedbackRepository;
    private final LayananRepository layananRepository;
    private final PenukaranRepository penukaranRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                 PerjalananRepository perjalananRepository,
                                 FeedbackRepository feedbackRepository,
                                 LayananRepository layananRepository,
                                 PenukaranRepository penukaranRepository) {
        this.userRepository = userRepository;
        this.perjalananRepository = perjalananRepository;
        this.feedbackRepository = feedbackRepository;
        this.layananRepository = layananRepository;
        this.penukaranRepository = penukaranRepository;
    }

    @Override
    public DashboardResponse getDashboard() {
        long totalUsers = userRepository.count();
        long totalPerjalanan = perjalananRepository.count();
        long totalFeedback = feedbackRepository.count();
        long totalLayanan = layananRepository.count();

        List<Penukaran> allPenukaran = penukaranRepository.findAll();
        long totalPenukaranBerhasil = allPenukaran.stream()
                .filter(p -> p.getStatus() == StatusPenukaran.BERHASIL).count();

        Integer totalPoinDistribusi = perjalananRepository.findAll().stream()
                .mapToInt(p -> p.getPoinDidapat() != null ? p.getPoinDidapat() : 0)
                .sum();

        return new DashboardResponse(
                totalUsers, totalPerjalanan, totalFeedback,
                totalLayanan, totalPenukaranBerhasil, totalPoinDistribusi
        );
    }
}
