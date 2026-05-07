package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LigneVenteRequestDto {

  private VentesRequestDto vente;
  private ArticleRequestDto article;
  private Integer idArticle;
  private BigDecimal quantite;
  private BigDecimal prixUnitaire;
  private Integer idEntreprise;
}