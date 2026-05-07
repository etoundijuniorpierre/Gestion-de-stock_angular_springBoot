package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import com.example.Gestion.de.stock.dto.response.AdresseResponseDto;
import com.example.Gestion.de.stock.model.entity.Adresse;

public class AdresseMapper {

    public static Adresse toEntity(AdresseRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Adresse adresse = new Adresse();
        adresse.setAdresse1(dto.getAdresse1());
        adresse.setAdresse2(dto.getAdresse2());
        adresse.setVille(dto.getVille());
        adresse.setCodePostale(dto.getCodePostale());
        adresse.setPays(dto.getPays());
        
        return adresse;
    }

    public static AdresseResponseDto fromEntity(Adresse adresse) {
        if (adresse == null) {
            return null;
        }
        
        return AdresseResponseDto.builder()
                .adresse1(adresse.getAdresse1())
                .adresse2(adresse.getAdresse2())
                .ville(adresse.getVille())
                .codePostale(adresse.getCodePostale())
                .pays(adresse.getPays())
                .build();
    }

    public static AdresseRequestDto toRequestDto(AdresseResponseDto responseDto) {
        if (responseDto == null) {
            return null;
        }
        
        return AdresseRequestDto.builder()
                .adresse1(responseDto.getAdresse1())
                .adresse2(responseDto.getAdresse2())
                .ville(responseDto.getVille())
                .codePostale(responseDto.getCodePostale())
                .pays(responseDto.getPays())
                .build();
    }
}