package com.TransPoin.service.impl;

import com.TransPoin.dto.DashboardResponse;
import com.TransPoin.enums.Role;
import com.TransPoin.enums.StatusPenukaran;
import com.TransPoin.enums.StatusPerjalanan;
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
    private final HalteRepository halteRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                 PerjalananRepository perjalananRepository,
                                 FeedbackRepository feedbackRepository,
                                 LayananRepository layananRepository,
                                 PenukaranRepository penukaranRepository,
                                 HalteRepository halteRepository) {
        this.userRepository = userRepository;
        this.perjalananRepository = perjalananRepository;
        this.feedbackRepository = feedbackRepository;
        this.layananRepository = layananRepository;
        this.penukaranRepository = penukaranRepository;
        this.halteRepository = halteRepository;
    }

    @Override
    public DashboardResponse getDashboard() {
        long totalUsers = userRepository.countByRole(Role.USER);
        long totalPerjalanan = perjalananRepository.count();
        long totalPerjalananPending = perjalananRepository.countByStatus(StatusPerjalanan.PENDING);
        long totalPerjalananApproved = perjalananRepository.countByStatus(StatusPerjalanan.APPROVED);
        long totalFeedback = feedbackRepository.count();
        long totalLayanan = layananRepository.count();
        long totalHalte = halteRepository.count();

        List<Penukaran> allPenukaran = penukaranRepository.findAll();
        long totalPenukaranBerhasil = allPenukaran.stream()
                .filter(p -> p.getStatus() == StatusPenukaran.BERHASIL).count();

        Integer totalPoinDistribusi = perjalananRepository.findByStatus(StatusPerjalanan.APPROVED).stream()
                .mapToInt(p -> p.getPoinDidapat() != null ? p.getPoinDidapat() : 0)
                .sum();

        return new DashboardResponse(
                totalUsers, totalPerjalanan, totalPerjalananPending, totalPerjalananApproved,
                totalFeedback, totalLayanan, totalHalte, totalPenukaranBerhasil, totalPoinDistribusi
        );
    }
}
