package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
import com.example.Gestion.de.stock.model.entity.Utilisateur;

public class UtilisateurMapper {

    public static Utilisateur toEntity(UtilisateurRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setMotDePasse(dto.getMotDePasse());
        utilisateur.setDateDeNaissance(dto.getDateDeNaissance());
        utilisateur.setAdresse(AdresseMapper.toEntity(dto.getAdresse()));
        utilisateur.setPhoto(dto.getPhoto());
        
        // Gérer l'entreprise : soit par objet, soit par ID
        if (dto.getEntreprise() != null) {
            utilisateur.setEntreprise(EntrepriseMapper.toEntity(dto.getEntreprise()));
        }
        // Note: Si entrepriseId est fourni, l'entreprise sera récupérée dans le service
        
        return utilisateur;
    }

    public static UtilisateurResponseDto fromEntity(Utilisateur utilisateur) {
        if (utilisateur == null) {
            return null;
        }
        
        return UtilisateurResponseDto.builder()
                .id(utilisateur.getId())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .email(utilisateur.getEmail())
                .dateDeNaissance(utilisateur.getDateDeNaissance())
                .adresse(AdresseMapper.fromEntity(utilisateur.getAdresse()))
                .photo(utilisateur.getPhoto())
                .entreprise(EntrepriseMapper.fromEntity(utilisateur.getEntreprise()))
                .build();
    }
}