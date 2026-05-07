package com.example.Gestion.de.stock.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdresseResponseDto {

  private Integer id;
  private String adresse1;
  private String adresse2;
  private String ville;
  private String codePostale;
  private String pays;
}