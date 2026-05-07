package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.CommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.request.LigneCommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;

import java.math.BigDecimal;
import java.util.List;

public interface CommandeClientService {

  CommandeClientResponseDto save(CommandeClientRequestDto dto);

  CommandeClientResponseDto updateEtatCommande(Integer idCommande, EtatCommande etatCommande);

  CommandeClientResponseDto updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite);

  CommandeClientResponseDto updateClient(Integer idCommande, Integer idClient);

  CommandeClientResponseDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer newIdArticle);

  // Delete article ==> delete LigneCommandeClient
  CommandeClientResponseDto deleteArticle(Integer idCommande, Integer idLigneCommande);

  CommandeClientResponseDto findById(Integer id);

  CommandeClientResponseDto findByCode(String code);

  List<CommandeClientResponseDto> findAll();

  List<LigneCommandeClientResponseDto> findAllLignesCommandesClientByCommandeClientId(Integer idCommande);

  void delete(Integer id);

}