package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.model.enumElem.SourceMvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MvtStkRequestDto {

  private LocalDate dateMvt;
  private BigDecimal quantite;
  private ArticleRequestDto article;
  private Integer idArticle; // Add this field to reference an existing article
  private TypeMvtStk typeMvt;
  private SourceMvtStk sourceMvt;
  private Integer idEntreprise;
}