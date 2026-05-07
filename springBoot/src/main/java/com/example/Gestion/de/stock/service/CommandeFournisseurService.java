package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.CommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.dto.request.LigneCommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;

import java.math.BigDecimal;
import java.util.List;

public interface CommandeFournisseurService {

  CommandeFournisseurResponseDto save(CommandeFournisseurRequestDto dto);

  CommandeFournisseurResponseDto updateEtatCommande(Integer idCommande, EtatCommande etatCommande);

  CommandeFournisseurResponseDto updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite);

  CommandeFournisseurResponseDto updateFournisseur(Integer idCommande, Integer idFournisseur);

  CommandeFournisseurResponseDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle);

  // Delete article ==> delete LigneCommandeFournisseur
  CommandeFournisseurResponseDto deleteArticle(Integer idCommande, Integer idLigneCommande);

  CommandeFournisseurResponseDto findById(Integer id);

  CommandeFournisseurResponseDto findByCode(String code);

  List<CommandeFournisseurResponseDto> findAll();

  List<LigneCommandeFournisseurResponseDto> findAllLignesCommandesFournisseurByCommandeFournisseurId(Integer idCommande);

  void delete(Integer id);

}