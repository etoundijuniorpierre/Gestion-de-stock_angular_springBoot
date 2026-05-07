package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.model.enumElem.SourceMvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MvtStkResponseDto {

  private Integer id;
  private LocalDate dateMvt;
  private BigDecimal quantite;
  private ArticleResponseDto article;
  private TypeMvtStk typeMvt;
  private SourceMvtStk sourceMvt;
  private Integer idEntreprise;
}