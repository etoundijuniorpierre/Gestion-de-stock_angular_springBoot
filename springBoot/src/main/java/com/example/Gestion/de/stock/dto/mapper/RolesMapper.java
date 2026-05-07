package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.response.RolesResponseDto;
import com.example.Gestion.de.stock.model.entity.Roles;

public class RolesMapper {

    public static RolesResponseDto fromEntity(Roles roles) {
        return RolesResponseDto.fromEntity(roles);
    }

    public static Roles toEntity(RolesResponseDto dto) {
        return RolesResponseDto.toEntity(dto);
    }
}
