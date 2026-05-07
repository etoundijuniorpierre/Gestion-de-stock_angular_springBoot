package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.LigneVenteResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class VentesResponseDto {

  private Integer id;
  private String code;
  private LocalDate dateVente;
  private String commentaire;
  private List<LigneVenteResponseDto> ligneVentes;
  private Integer idEntreprise;
}