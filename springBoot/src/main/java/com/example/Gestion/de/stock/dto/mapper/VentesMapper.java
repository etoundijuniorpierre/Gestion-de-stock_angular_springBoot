package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;
import com.example.Gestion.de.stock.model.entity.Ventes;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class VentesMapper {

    public static Ventes toEntity(VentesRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Ventes ventes = new Ventes();
        ventes.setCode(dto.getCode());
        ventes.setDateVente(dto.getDateVente());
        ventes.setCommentaire(dto.getCommentaire());
        ventes.setIdEntreprise(dto.getIdEntreprise());
        // Note: ligneVentes is handled separately in the service
        
        return ventes;
    }

    public static VentesResponseDto fromEntity(Ventes ventes) {
        if (ventes == null) {
            return null;
        }
        
        return VentesResponseDto.builder()
                .id(ventes.getId())
                .code(ventes.getCode())
                .dateVente(ventes.getDateVente())
                .commentaire(ventes.getCommentaire())
                .idEntreprise(ventes.getIdEntreprise())
                .ligneVentes(ventes.getLigneVentes() != null ? 
                    ventes.getLigneVentes().stream()
                        .map(LigneVenteMapper::fromEntity)
                        .collect(Collectors.toList()) : 
                    new ArrayList<>())
                .build();
    }
}