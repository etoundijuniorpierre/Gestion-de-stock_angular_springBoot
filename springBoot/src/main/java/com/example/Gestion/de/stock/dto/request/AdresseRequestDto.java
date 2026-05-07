package com.example.Gestion.de.stock.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdresseRequestDto {

  private String adresse1;
  private String adresse2;
  private String ville;
  private String codePostale;
  private String pays;
}