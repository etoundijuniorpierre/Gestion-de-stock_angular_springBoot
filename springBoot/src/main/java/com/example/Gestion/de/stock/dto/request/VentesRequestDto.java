package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.LigneVenteRequestDto;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VentesRequestDto {

  private String code;
  private LocalDate dateVente;
  private String commentaire;
  private Integer idEntreprise;
  private List<LigneVenteRequestDto> ligneVentes;
}