package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.ClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommandeClientResponseDto {

  private Integer id;
  private String code;
  private LocalDate dateCommande;
  private EtatCommande etatCommande;
  private ClientResponseDto client;
  private Integer idEntreprise;
  private List<LigneCommandeClientResponseDto> ligneCommandeClients;

  public boolean isCommandeLivree() {
    return this.etatCommande != null && this.etatCommande.name().equals("LIVREE");
  }
}