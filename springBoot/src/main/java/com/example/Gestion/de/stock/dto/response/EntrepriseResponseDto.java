package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.AdresseResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EntrepriseResponseDto {

  private Integer id;
  private String nom;
  private String description;
  private AdresseResponseDto adresse;
  private String codeFiscal;
  private String photo;
  private String email;
  private String numTel;
  private String steWeb;
}