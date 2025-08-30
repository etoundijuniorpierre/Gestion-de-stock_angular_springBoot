package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.CommandeFournisseurDto;
import com.example.Gestion.de.stock.dto.LigneCommandeFournisseurDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.example.Gestion.de.stock.utils.Constants.*;

@Tag(name = APP_ROOT + "/commandefournisseur")
public interface CommandeFournisseurApi {

  @Operation(summary = "Créer une commande fournisseur")
  @PostMapping(CREATE_COMMANDE_FOURNISSEUR_ENDPOINT)
  CommandeFournisseurDto save(@RequestBody CommandeFournisseurDto dto);

  @Operation(summary = "Mettre à jour l'état d'une commande fournisseur")
  @PatchMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/update/etat/{idCommande}/{etatCommande}")
  CommandeFournisseurDto updateEtatCommande(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "Nouvel état de la commande") @PathVariable("etatCommande") EtatCommande etatCommande);

  @Operation(summary = "Mettre à jour la quantité d'une ligne de commande")
  @PatchMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/update/quantite/{idCommande}/{idLigneCommande}/{quantite}")
  CommandeFournisseurDto updateQuantiteCommande(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande,
          @Parameter(description = "Nouvelle quantité") @PathVariable("quantite") BigDecimal quantite);

  @Operation(summary = "Changer le fournisseur d'une commande")
  @PatchMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/update/fournisseur/{idCommande}/{idFournisseur}")
  CommandeFournisseurDto updateFournisseur(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID du nouveau fournisseur") @PathVariable("idFournisseur") Integer idFournisseur);

  @Operation(summary = "Changer l'article d'une ligne de commande")
  @PatchMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/update/article/{idCommande}/{idLigneCommande}/{idArticle}")
  CommandeFournisseurDto updateArticle(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande,
          @Parameter(description = "ID du nouvel article") @PathVariable("idArticle") Integer idArticle);

  @Operation(summary = "Supprimer un article d'une commande")
  @DeleteMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/delete/article/{idCommande}/{idLigneCommande}")
  CommandeFournisseurDto deleteArticle(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande);

  @Operation(summary = "Trouver une commande fournisseur par son ID")
  @GetMapping(FIND_COMMANDE_FOURNISSEUR_BY_ID_ENDPOINT)
  CommandeFournisseurDto findById(
          @Parameter(description = "ID de la commande fournisseur") @PathVariable("idCommandeFournisseur") Integer id);

  @Operation(summary = "Trouver une commande fournisseur par son code")
  @GetMapping(FIND_COMMANDE_FOURNISSEUR_BY_CODE_ENDPOINT)
  CommandeFournisseurDto findByCode(
          @Parameter(description = "Code de la commande fournisseur") @PathVariable("codeCommandeFournisseur") String code);

  @Operation(summary = "Lister toutes les commandes fournisseurs")
  @GetMapping(FIND_ALL_COMMANDE_FOURNISSEUR_ENDPOINT)
  List<CommandeFournisseurDto> findAll();

  @Operation(summary = "Lister toutes les lignes de commande d'une commande fournisseur")
  @GetMapping(COMMANDE_FOURNISSEUR_ENDPOINT + "/lignesCommande/{idCommande}")
  List<LigneCommandeFournisseurDto> findAllLignesCommandesFournisseurByCommandeFournisseurId(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande);

  @Operation(summary = "Supprimer une commande fournisseur")
  @DeleteMapping(DELETE_COMMANDE_FOURNISSEUR_ENDPOINT)
  void delete(
          @Parameter(description = "ID de la commande fournisseur à supprimer") @PathVariable("idCommandeFournisseur") Integer id);
}