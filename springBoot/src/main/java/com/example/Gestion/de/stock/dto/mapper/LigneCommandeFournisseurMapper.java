package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.LigneCommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.model.entity.LigneCommandeFournisseur;

public class LigneCommandeFournisseurMapper {

    public static LigneCommandeFournisseur toEntity(LigneCommandeFournisseurRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        LigneCommandeFournisseur ligneCommandeFournisseur = new LigneCommandeFournisseur();
        // Note: CommandeFournisseur should be set separately in the service layer to avoid circular reference
        // ligneCommandeFournisseur.setCommandeFournisseur() is handled in CommandeFournisseurServiceImpl
        ligneCommandeFournisseur.setArticle(ArticleMapper.toEntity(dto.getArticle()));
        ligneCommandeFournisseur.setQuantite(dto.getQuantite());
        ligneCommandeFournisseur.setPrixUnitaire(dto.getPrixUnitaire());
        ligneCommandeFournisseur.setIdEntreprise(dto.getIdEntreprise());
        
        return ligneCommandeFournisseur;
    }

    public static LigneCommandeFournisseurResponseDto fromEntity(LigneCommandeFournisseur ligneCommandeFournisseur) {
        if (ligneCommandeFournisseur == null) {
            return null;
        }
        
        LigneCommandeFournisseurResponseDto.LigneCommandeFournisseurResponseDtoBuilder builder = LigneCommandeFournisseurResponseDto.builder()
                .id(ligneCommandeFournisseur.getId())
                .commandeFournisseurId(ligneCommandeFournisseur.getCommandeFournisseur() != null ? ligneCommandeFournisseur.getCommandeFournisseur().getId() : null)
                // Remove the full commandeFournisseur mapping to avoid circular reference
                .quantite(ligneCommandeFournisseur.getQuantite())
                .prixUnitaire(ligneCommandeFournisseur.getPrixUnitaire())
                .idEntreprise(ligneCommandeFournisseur.getIdEntreprise());
        
        // Set article if it exists
        if (ligneCommandeFournisseur.getArticle() != null) {
            builder.article(ArticleMapper.fromEntity(ligneCommandeFournisseur.getArticle()));
        }
        
        return builder.build();
    }
}