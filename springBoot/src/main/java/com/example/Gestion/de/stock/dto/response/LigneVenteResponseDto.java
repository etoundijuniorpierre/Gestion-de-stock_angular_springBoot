package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonIgnoreProperties({"vente"})
public class LigneVenteResponseDto {

  private Integer id;
  private Integer venteId; // Add this field to store just the ID
  private VentesResponseDto vente;
  private ArticleResponseDto article;
  private BigDecimal quantite;
  private BigDecimal prixUnitaire;
  private Integer idEntreprise;
}