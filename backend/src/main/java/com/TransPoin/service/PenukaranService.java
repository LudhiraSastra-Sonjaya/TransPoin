package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface PenukaranService {
    PenukaranResponse tukarReward(TukarRewardRequest request);
    List<PenukaranResponse> getByUserId(Long userId);
    List<PenukaranResponse> getAllPenukaran();
}
