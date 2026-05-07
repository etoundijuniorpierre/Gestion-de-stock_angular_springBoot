package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EntrepriseRequestDto {

  private String nom;
  private String description;
  private AdresseRequestDto adresse;
  private String codeFiscal;
  private String photo;
  private String email;
  private String numTel;
  private String steWeb;
}