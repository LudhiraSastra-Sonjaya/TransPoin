package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.enums.StatusFeedback;
import com.TransPoin.model.Feedback;
import com.TransPoin.model.Perjalanan;
import com.TransPoin.model.User;
import com.TransPoin.repository.FeedbackRepository;
import com.TransPoin.repository.PerjalananRepository;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final PerjalananRepository perjalananRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,
                                UserRepository userRepository,
                                PerjalananRepository perjalananRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.perjalananRepository = perjalananRepository;
    }

    @Override
    public List<FeedbackResponse> getAllFeedback() {
        return feedbackRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<FeedbackResponse> getFeedbackByUserId(Long userId) {
        return feedbackRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FeedbackResponse createFeedback(FeedbackRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
        Perjalanan perjalanan = perjalananRepository.findById(request.getPerjalananId())
                .orElseThrow(() -> new RuntimeException("Perjalanan tidak ditemukan"));

        Feedback feedback = new Feedback();
        feedback.setRating(request.getRating());
        feedback.setKomentar(request.getKomentar());
        feedback.setTanggal(LocalDate.now());
        feedback.setStatus(StatusFeedback.PENDING);
        feedback.setUser(user);
        feedback.setPerjalanan(perjalanan);

        return mapToResponse(feedbackRepository.save(feedback));
    }

    @Override
    public FeedbackResponse updateStatus(Long id, String status) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback tidak ditemukan"));
        feedback.setStatus(StatusFeedback.valueOf(status));
        return mapToResponse(feedbackRepository.save(feedback));
    }

    private FeedbackResponse mapToResponse(Feedback f) {
        String perjalananInfo = f.getPerjalanan() != null
                ? f.getPerjalanan().getAsal() + " → " + f.getPerjalanan().getTujuan()
                : null;
        return new FeedbackResponse(
                f.getId(), f.getRating(), f.getKomentar(), f.getTanggal(),
                f.getStatus() != null ? f.getStatus().name() : null,
                f.getUser() != null ? f.getUser().getId() : null,
                f.getUser() != null ? f.getUser().getNama() : null,
                f.getPerjalanan() != null ? f.getPerjalanan().getId() : null,
                perjalananInfo
        );
    }
}
