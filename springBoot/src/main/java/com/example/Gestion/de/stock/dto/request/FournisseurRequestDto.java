package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FournisseurRequestDto {

  private String nom;
  private String prenom;
  private AdresseRequestDto adresse;
  private String photo;
  private String mail;
  private String numTel;
  private Integer idEntreprise;
}