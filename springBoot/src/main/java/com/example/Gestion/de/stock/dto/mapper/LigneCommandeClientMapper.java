package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.LigneCommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.model.entity.LigneCommandeClient;

public class LigneCommandeClientMapper {

    public static LigneCommandeClient toEntity(LigneCommandeClientRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        LigneCommandeClient ligneCommandeClient = new LigneCommandeClient();
        // Note: CommandeClient should be set separately in the service layer to avoid circular reference
        // ligneCommandeClient.setCommandeClient() is handled in CommandeClientServiceImpl
        ligneCommandeClient.setArticle(ArticleMapper.toEntity(dto.getArticle()));
        ligneCommandeClient.setQuantite(dto.getQuantite());
        ligneCommandeClient.setPrixUnitaire(dto.getPrixUnitaire());
        ligneCommandeClient.setIdEntreprise(dto.getIdEntreprise());
        
        return ligneCommandeClient;
    }

    public static LigneCommandeClientResponseDto fromEntity(LigneCommandeClient ligneCommandeClient) {
        if (ligneCommandeClient == null) {
            return null;
        }
        
        LigneCommandeClientResponseDto.LigneCommandeClientResponseDtoBuilder builder = LigneCommandeClientResponseDto.builder()
                .id(ligneCommandeClient.getId())
                .commandeClientId(ligneCommandeClient.getCommandeClient() != null ? ligneCommandeClient.getCommandeClient().getId() : null)
                // Remove the full commandeClient mapping to avoid circular reference
                .quantite(ligneCommandeClient.getQuantite())
                .prixUnitaire(ligneCommandeClient.getPrixUnitaire())
                .idEntreprise(ligneCommandeClient.getIdEntreprise());
        
        // Set article if it exists
        if (ligneCommandeClient.getArticle() != null) {
            builder.article(ArticleMapper.fromEntity(ligneCommandeClient.getArticle()));
        }
        
        return builder.build();
    }
}