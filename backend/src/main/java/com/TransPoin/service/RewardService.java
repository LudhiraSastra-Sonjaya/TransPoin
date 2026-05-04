package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface RewardService {
    List<RewardResponse> getAllReward();
    RewardResponse createReward(RewardRequest request);
}
