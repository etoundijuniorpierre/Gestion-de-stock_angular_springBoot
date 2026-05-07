package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.CategorieRequestDto;
import com.example.Gestion.de.stock.dto.response.CategorieResponseDto;
import com.example.Gestion.de.stock.model.entity.Categorie;

public class CategorieMapper {

    public static Categorie toEntity(CategorieRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Categorie categorie = new Categorie();
        categorie.setCode(dto.getCode());
        categorie.setDesignation(dto.getDesignation());
        categorie.setIdEntreprise(dto.getIdEntreprise());
        
        return categorie;
    }

    public static CategorieResponseDto fromEntity(Categorie categorie) {
        if (categorie == null) {
            return null;
        }
        
        return CategorieResponseDto.builder()
                .id(categorie.getId())
                .code(categorie.getCode())
                .designation(categorie.getDesignation())
                .idEntreprise(categorie.getIdEntreprise())
                .build();
    }

    public static CategorieRequestDto toRequestDto(Categorie categorie) {
        if (categorie == null) {
            return null;
        }
        
        return CategorieRequestDto.builder()
                .code(categorie.getCode())
                .designation(categorie.getDesignation())
                .idEntreprise(categorie.getIdEntreprise())
                .build();
    }
}