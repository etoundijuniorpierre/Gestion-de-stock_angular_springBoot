package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.LigneVenteRequestDto;
import com.example.Gestion.de.stock.dto.response.LigneVenteResponseDto;
import com.example.Gestion.de.stock.model.entity.Article;
import com.example.Gestion.de.stock.model.entity.LigneVente;

public class LigneVenteMapper {

    public static LigneVente toEntity(LigneVenteRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        LigneVente ligneVente = new LigneVente();
        // Note: Vente should be set separately in the service layer to avoid circular reference
        // ligneVente.setVente() is handled in VentesServiceImpl
        // Set the article if provided
        if (dto.getArticle() != null) {
            ligneVente.setArticle(ArticleMapper.toEntity(dto.getArticle()));
        }
        // Set the article ID if provided
        if (dto.getIdArticle() != null) {
            Article article = new Article();
            article.setId(dto.getIdArticle());
            ligneVente.setArticle(article);
        }
        ligneVente.setQuantite(dto.getQuantite());
        ligneVente.setPrixUnitaire(dto.getPrixUnitaire());
        ligneVente.setIdEntreprise(dto.getIdEntreprise());
        
        return ligneVente;
    }

    public static LigneVenteResponseDto fromEntity(LigneVente ligneVente) {
        if (ligneVente == null) {
            return null;
        }
        
        LigneVenteResponseDto.LigneVenteResponseDtoBuilder builder = LigneVenteResponseDto.builder()
                .id(ligneVente.getId())
                .venteId(ligneVente.getVente() != null ? ligneVente.getVente().getId() : null)
                // Remove the full vente mapping to avoid circular reference
                .quantite(ligneVente.getQuantite())
                .prixUnitaire(ligneVente.getPrixUnitaire())
                .idEntreprise(ligneVente.getIdEntreprise());
        
        // Set article if it exists
        if (ligneVente.getArticle() != null) {
            builder.article(ArticleMapper.fromEntity(ligneVente.getArticle()));
        }
        
        return builder.build();
    }
}