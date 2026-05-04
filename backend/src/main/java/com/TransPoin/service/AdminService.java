package com.TransPoin.service;

import com.TransPoin.dto.*;

public interface AdminService {
    AdminResponse login(AdminLoginRequest request);
    AdminResponse getById(Long id);
}
