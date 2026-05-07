package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import com.example.Gestion.de.stock.dto.response.EntrepriseResponseDto;
import com.example.Gestion.de.stock.model.entity.Entreprise;

public class EntrepriseMapper {

    public static Entreprise toEntity(EntrepriseRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Entreprise entreprise = new Entreprise();
        entreprise.setNom(dto.getNom());
        entreprise.setDescription(dto.getDescription());
        entreprise.setAdresse(AdresseMapper.toEntity(dto.getAdresse()));
        entreprise.setCodeFiscal(dto.getCodeFiscal());
        entreprise.setPhoto(dto.getPhoto());
        entreprise.setEmail(dto.getEmail());
        entreprise.setNumTel(dto.getNumTel());
        entreprise.setSteWeb(dto.getSteWeb());
        
        return entreprise;
    }

    public static EntrepriseResponseDto fromEntity(Entreprise entreprise) {
        if (entreprise == null) {
            return null;
        }
        
        return EntrepriseResponseDto.builder()
                .id(entreprise.getId())
                .nom(entreprise.getNom())
                .description(entreprise.getDescription())
                .adresse(AdresseMapper.fromEntity(entreprise.getAdresse()))
                .codeFiscal(entreprise.getCodeFiscal())
                .photo(entreprise.getPhoto())
                .email(entreprise.getEmail())
                .numTel(entreprise.getNumTel())
                .steWeb(entreprise.getSteWeb())
                .build();
    }

    public static EntrepriseRequestDto toRequestDto(EntrepriseResponseDto responseDto) {
        if (responseDto == null) {
            return null;
        }
        
        return EntrepriseRequestDto.builder()
                .nom(responseDto.getNom())
                .description(responseDto.getDescription())
                .adresse(AdresseMapper.toRequestDto(responseDto.getAdresse()))
                .codeFiscal(responseDto.getCodeFiscal())
                .photo(responseDto.getPhoto())
                .email(responseDto.getEmail())
                .numTel(responseDto.getNumTel())
                .steWeb(responseDto.getSteWeb())
                .build();
    }
}