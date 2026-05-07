package com.example.Gestion.de.stock.dto.response;

import java.math.BigDecimal;
import com.example.Gestion.de.stock.dto.response.CategorieResponseDto;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleResponseDto {

  private Integer id;
  private String codeArticle;
  private String designation;
  private BigDecimal prixUnitaireHt;
  private BigDecimal tauxTva;
  private BigDecimal prixUnitaireTtc;
  private String photo;
  private CategorieResponseDto categorie;
  private Integer idEntreprise;
}