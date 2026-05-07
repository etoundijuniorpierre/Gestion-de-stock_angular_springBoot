package com.example.Gestion.de.stock.controler;


import java.math.BigDecimal;
import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.CommandeFournisseurApi;
import com.example.Gestion.de.stock.dto.request.CommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import com.example.Gestion.de.stock.service.CommandeFournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommandeFournisseurController implements CommandeFournisseurApi {

  private CommandeFournisseurService commandeFournisseurService;

  @Autowired
  public CommandeFournisseurController(CommandeFournisseurService commandeFournisseurService) {
    this.commandeFournisseurService = commandeFournisseurService;
  }

  @Override
  public CommandeFournisseurResponseDto save(CommandeFournisseurRequestDto dto) {
    return commandeFournisseurService.save(dto);
  }

  @Override
  public CommandeFournisseurResponseDto updateEtatCommande(Integer idCommande, EtatCommande etatCommande) {
    return commandeFournisseurService.updateEtatCommande(idCommande, etatCommande);
  }

  @Override
  public CommandeFournisseurResponseDto updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite) {
    return commandeFournisseurService.updateQuantiteCommande(idCommande, idLigneCommande, quantite);
  }

  @Override
  public CommandeFournisseurResponseDto updateFournisseur(Integer idCommande, Integer idFournisseur) {
    return commandeFournisseurService.updateFournisseur(idCommande, idFournisseur);
  }

  @Override
  public CommandeFournisseurResponseDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle) {
    return commandeFournisseurService.updateArticle(idCommande, idLigneCommande, idArticle);
  }

  @Override
  public CommandeFournisseurResponseDto deleteArticle(Integer idCommande, Integer idLigneCommande) {
    return commandeFournisseurService.deleteArticle(idCommande, idLigneCommande);
  }

  @Override
  public CommandeFournisseurResponseDto findById(Integer id) {
    return commandeFournisseurService.findById(id);
  }

  @Override
  public CommandeFournisseurResponseDto findByCode(String code) {
    return commandeFournisseurService.findByCode(code);
  }

  @Override
  public List<CommandeFournisseurResponseDto> findAll() {
    return commandeFournisseurService.findAll();
  }

  @Override
  public List<LigneCommandeFournisseurResponseDto> findAllLignesCommandesFournisseurByCommandeFournisseurId(Integer idCommande) {
    return commandeFournisseurService.findAllLignesCommandesFournisseurByCommandeFournisseurId(idCommande);
  }

  @Override
  public void delete(Integer id) {
    commandeFournisseurService.delete(id);
  }
}