package com.example.Gestion.de.stock.dto;


import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.model.entity.Utilisateur;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UtilisateurDto {

  private Integer id;

  private String nom;

  private String prenom;

  private String email;

  private Instant dateDeNaissance;

  private String motDePasse;

  private AdresseDto adresse;

  private String photo;

  private EntrepriseDto entreprise;

  private List<RolesDto> roles;

  public static UtilisateurDto fromEntity(Utilisateur utilisateur) {
    if (utilisateur == null) {
      return null;
    }

    return UtilisateurDto.builder()
        .id(utilisateur.getId())
        .nom(utilisateur.getNom())
        .prenom(utilisateur.getPrenom())
        .email(utilisateur.getEmail())
        .motDePasse(utilisateur.getMotDePasse())
        .dateDeNaissance(utilisateur.getDateDeNaissance())
        .adresse(AdresseDto.fromEntity(utilisateur.getAdresse()))
        .photo(utilisateur.getPhoto())
        .entreprise(EntrepriseDto.fromEntity(utilisateur.getEntreprise()))
        .roles(
            utilisateur.getRoles() != null ?
                utilisateur.getRoles().stream()
                    .map(RolesDto::fromEntity)
                    .collect(Collectors.toList()) : null
        )
        .build();
  }

  public static Utilisateur toEntity(UtilisateurDto dto) {
    if (dto == null) {
      return null;
    }

    Utilisateur utilisateur = new Utilisateur();
    utilisateur.setId(dto.getId());
    utilisateur.setNom(dto.getNom());
    utilisateur.setPrenom(dto.getPrenom());
    utilisateur.setEmail(dto.getEmail());
    utilisateur.setMotDePasse(dto.getMotDePasse());
    utilisateur.setDateDeNaissance(dto.getDateDeNaissance());
    utilisateur.setAdresse(AdresseDto.toEntity(dto.getAdresse()));
    utilisateur.setPhoto(dto.getPhoto());
    utilisateur.setEntreprise(EntrepriseDto.toEntity(dto.getEntreprise()));

    return utilisateur;
  }
}
