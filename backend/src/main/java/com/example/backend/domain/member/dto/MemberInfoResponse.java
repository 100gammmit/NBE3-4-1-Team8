package com.example.backend.domain.member.dto;

import com.example.backend.domain.common.Address;
import com.example.backend.domain.member.entity.Role;

import lombok.Builder;

@Builder
public record MemberInfoResponse (String username, String nickname, Role role, Address address){
}
