package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UtilisateurRequestDto {

  private String nom;
  private String prenom;
  private String email;
  private LocalDate dateDeNaissance;
  private String motDePasse;
  private AdresseRequestDto adresse;
  private String photo;
  private EntrepriseRequestDto entreprise;
  private Integer entrepriseId;
}