package com.TransPoin.service;

import com.TransPoin.dto.*;
import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse register(UserRegisterRequest request);
    UserResponse login(UserLoginRequest request);
}
