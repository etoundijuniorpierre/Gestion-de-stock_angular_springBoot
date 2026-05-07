package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.CommandeClientResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonIgnoreProperties({"commandeClient"})
public class LigneCommandeClientResponseDto {

  private Integer id;
  private Integer commandeClientId; // Add this field to store just the ID
  private CommandeClientResponseDto commandeClient;
  private ArticleResponseDto article;
  private BigDecimal quantite;
  private BigDecimal prixUnitaire;
  private Integer idEntreprise;
}