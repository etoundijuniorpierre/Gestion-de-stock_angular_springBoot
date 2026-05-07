package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommandeFournisseurResponseDto {

  private Integer id;
  private String code;
  private LocalDate dateCommande;
  private EtatCommande etatCommande;
  private FournisseurResponseDto fournisseur;
  private Integer idEntreprise;
  private List<LigneCommandeFournisseurResponseDto> ligneCommandeFournisseurs;
}