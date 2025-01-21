package com.example.backend.global.auth.dto;

import com.example.backend.domain.member.entity.Role;

import lombok.Builder;

@Builder
public record AuthLoginResponse (String username, String nickname) {

    public static AuthLoginResponse of(String username, String nickname) {
        return new AuthLoginResponse(username, nickname);
    }
}
