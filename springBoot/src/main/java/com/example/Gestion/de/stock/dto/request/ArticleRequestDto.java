 
 package com.example.Gestion.de.stock.dto.request;

import java.math.BigDecimal;
import com.example.Gestion.de.stock.dto.request.CategorieRequestDto;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleRequestDto {

  private String codeArticle;
  private String designation;
  private BigDecimal prixUnitaireHt;
  private BigDecimal tauxTva;
  private BigDecimal prixUnitaireTtc;
  private String photo;
  private CategorieRequestDto categorie;
  private Integer idEntreprise;
}