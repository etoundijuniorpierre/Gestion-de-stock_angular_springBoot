package com.example.Gestion.de.stock.controler;


import java.math.BigDecimal;
import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.CommandeClientApi;
import com.example.Gestion.de.stock.dto.request.CommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import com.example.Gestion.de.stock.service.CommandeClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommandeClientController implements CommandeClientApi {

  private CommandeClientService commandeClientService;

  @Autowired
  public CommandeClientController(CommandeClientService commandeClientService) {
    this.commandeClientService = commandeClientService;
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> save(CommandeClientRequestDto dto) {
    return ResponseEntity.ok(commandeClientService.save(dto));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> updateEtatCommande(Integer idCommande, EtatCommande etatCommande) {
    return ResponseEntity.ok(commandeClientService.updateEtatCommande(idCommande, etatCommande));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite) {
    return ResponseEntity.ok(commandeClientService.updateQuantiteCommande(idCommande, idLigneCommande, quantite));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> updateClient(Integer idCommande, Integer idClient) {
    return ResponseEntity.ok(commandeClientService.updateClient(idCommande, idClient));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle) {
    return ResponseEntity.ok(commandeClientService.updateArticle(idCommande, idLigneCommande, idArticle));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> deleteArticle(Integer idCommande, Integer idLigneCommande) {
    return ResponseEntity.ok(commandeClientService.deleteArticle(idCommande, idLigneCommande));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> findById(Integer id) {
    return ResponseEntity.ok(commandeClientService.findById(id));
  }

  @Override
  public ResponseEntity<CommandeClientResponseDto> findByCode(String code) {
    return ResponseEntity.ok(commandeClientService.findByCode(code));
  }

  @Override
  public ResponseEntity<List<CommandeClientResponseDto>> findAll() {
    return ResponseEntity.ok(commandeClientService.findAll());
  }

  @Override
  public ResponseEntity<List<LigneCommandeClientResponseDto>> findAllLignesCommandesClientByCommandeClientId(Integer idCommande) {
    return ResponseEntity.ok(commandeClientService.findAllLignesCommandesClientByCommandeClientId(idCommande));
  }

  @Override
  public ResponseEntity<Void> delete(Integer id) {
    commandeClientService.delete(id);
    return ResponseEntity.ok().build();
  }
}