package com.example.Gestion.de.stock.dto.request;

import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommandeFournisseurRequestDto {

  private String code;
  private LocalDate dateCommande;
  private EtatCommande etatCommande;
  private Integer fournisseurId;
  private Integer idEntreprise;
  private List<LigneCommandeFournisseurRequestDto> ligneCommandeFournisseurs;
}