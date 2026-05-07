package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.AdresseResponseDto;
import com.example.Gestion.de.stock.dto.response.EntrepriseResponseDto;
import com.example.Gestion.de.stock.dto.response.RolesResponseDto;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UtilisateurResponseDto {

  private Integer id;
  private String nom;
  private String prenom;
  private String email;
  private LocalDate dateDeNaissance;
  private AdresseResponseDto adresse;
  private String photo;
  private EntrepriseResponseDto entreprise;
  private List<RolesResponseDto> roles;
}