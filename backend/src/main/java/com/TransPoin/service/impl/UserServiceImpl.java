package com.TransPoin.service.impl;

import com.TransPoin.dto.*;
import com.TransPoin.enums.Role;
import com.TransPoin.model.User;
import com.TransPoin.repository.UserRepository;
import com.TransPoin.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        // Hanya kembalikan user dengan role USER (bukan admin)
        return userRepository.findByRole(Role.USER).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan dengan id: " + id));
        return mapToResponse(user);
    }

    @Override
    public UserResponse register(UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email sudah terdaftar");
        }
        User user = new User();
        user.setNama(request.getNama());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setTotalPoin(0);
        user.setRole(Role.USER);
        return mapToResponse(userRepository.save(user));
    }

    @Override
    public UserResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmailAndRole(request.getEmail(), Role.USER)
                .orElseThrow(() -> new RuntimeException("Email tidak ditemukan atau bukan akun user"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Password salah");
        }
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getNama(),
                user.getEmail(),
                user.getTotalPoin(),
                user.getRole() != null ? user.getRole().name() : "USER"
        );
    }
}
