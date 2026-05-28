package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface FeedbackService {
    List<FeedbackResponse> getAllFeedback();
    List<FeedbackResponse> getFeedbackByUserId(Long userId);
    FeedbackResponse createFeedback(FeedbackRequest request);
    FeedbackResponse updateStatus(Long id, String status);
}
