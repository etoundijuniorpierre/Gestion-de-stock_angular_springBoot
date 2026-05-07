package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.CommandeFournisseurResponseDto;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LigneCommandeFournisseurResponseDto {

  private Integer id;
  private Integer commandeFournisseurId; // Add this field to store just the ID
  private CommandeFournisseurResponseDto commandeFournisseur;
  private ArticleResponseDto article;
  private BigDecimal quantite;
  private BigDecimal prixUnitaire;
  private Integer idEntreprise;
}