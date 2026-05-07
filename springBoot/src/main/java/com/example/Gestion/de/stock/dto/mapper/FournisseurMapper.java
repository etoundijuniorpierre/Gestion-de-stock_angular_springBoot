package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;
import com.example.Gestion.de.stock.model.entity.Fournisseur;

public class FournisseurMapper {

    public static Fournisseur toEntity(FournisseurRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setNom(dto.getNom());
        fournisseur.setPrenom(dto.getPrenom());
        fournisseur.setAdresse(AdresseMapper.toEntity(dto.getAdresse()));
        fournisseur.setPhoto(dto.getPhoto());
        fournisseur.setMail(dto.getMail());
        fournisseur.setNumTel(dto.getNumTel());
        fournisseur.setIdEntreprise(dto.getIdEntreprise());
        
        return fournisseur;
    }

    public static FournisseurResponseDto fromEntity(Fournisseur fournisseur) {
        if (fournisseur == null) {
            return null;
        }
        
        return FournisseurResponseDto.builder()
                .id(fournisseur.getId())
                .nom(fournisseur.getNom())
                .prenom(fournisseur.getPrenom())
                .adresse(AdresseMapper.fromEntity(fournisseur.getAdresse()))
                .photo(fournisseur.getPhoto())
                .mail(fournisseur.getMail())
                .numTel(fournisseur.getNumTel())
                .idEntreprise(fournisseur.getIdEntreprise())
                .build();
    }
}