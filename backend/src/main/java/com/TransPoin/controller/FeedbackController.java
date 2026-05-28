package com.TransPoin.controller;

import com.TransPoin.dto.*;
import com.TransPoin.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public ResponseEntity<List<FeedbackResponse>> getAll() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedbackResponse>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody FeedbackRequest request) {
        try {
            return ResponseEntity.ok(feedbackService.createFeedback(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        try {
            return ResponseEntity.ok(feedbackService.updateStatus(id, request.getStatus()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
