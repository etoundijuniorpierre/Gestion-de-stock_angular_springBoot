package com.example.Gestion.de.stock.controler.controllerApi;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

import com.example.Gestion.de.stock.dto.CommandeClientDto;
import com.example.Gestion.de.stock.dto.LigneCommandeClientDto;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Commandes Clients", description = "API pour la gestion des commandes clients")
@RequestMapping(APP_ROOT + "/commandesclients")
public interface CommandeClientApi {

  @PostMapping(value = "/create")
  @Operation(summary = "Créer une commande client", description = "Enregistre une nouvelle commande client")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Commande client créée",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "400", description = "Données de commande invalides")
  })
  ResponseEntity<CommandeClientDto> save(@RequestBody CommandeClientDto dto);

  @PatchMapping(value = "/update/etat/{idCommande}/{etatCommande}")
  @Operation(summary = "Mettre à jour l'état d'une commande", description = "Modifie l'état d'une commande client existante")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "État de commande mis à jour",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande non trouvée")
  })
  ResponseEntity<CommandeClientDto> updateEtatCommande(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "Nouvel état de la commande") @PathVariable("etatCommande") EtatCommande etatCommande);

  @PatchMapping(value = "/update/quantite/{idCommande}/{idLigneCommande}/{quantite}")
  @Operation(summary = "Mettre à jour la quantité d'une ligne de commande", description = "Modifie la quantité d'un article dans une commande client")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Quantité mise à jour",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande ou ligne de commande non trouvée")
  })
  ResponseEntity<CommandeClientDto> updateQuantiteCommande(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande,
          @Parameter(description = "Nouvelle quantité") @PathVariable("quantite") BigDecimal quantite);

  @PatchMapping(value = "/update/client/{idCommande}/{idClient}")
  @Operation(summary = "Mettre à jour le client d'une commande", description = "Modifie le client associé à une commande")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Client mis à jour",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande ou client non trouvé")
  })
  ResponseEntity<CommandeClientDto> updateClient(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID du nouveau client") @PathVariable("idClient") Integer idClient);

  @PatchMapping(value = "/update/article/{idCommande}/{idLigneCommande}/{idArticle}")
  @Operation(summary = "Mettre à jour l'article d'une ligne de commande", description = "Modifie l'article d'une ligne de commande existante")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Article mis à jour",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande, ligne de commande ou article non trouvé")
  })
  ResponseEntity<CommandeClientDto> updateArticle(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande,
          @Parameter(description = "ID du nouvel article") @PathVariable("idArticle") Integer idArticle);

  @DeleteMapping(value = "/delete/article/{idCommande}/{idLigneCommande}")
  @Operation(summary = "Supprimer une ligne de commande", description = "Supprime un article d'une commande client")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Ligne de commande supprimée",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande ou ligne de commande non trouvée")
  })
  ResponseEntity<CommandeClientDto> deleteArticle(
          @Parameter(description = "ID de la commande") @PathVariable("idCommande") Integer idCommande,
          @Parameter(description = "ID de la ligne de commande") @PathVariable("idLigneCommande") Integer idLigneCommande);

  @GetMapping(value = "/{idCommandeClient}")
  @Operation(summary = "Trouver une commande par ID", description = "Récupère une commande client par son identifiant")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Commande trouvée",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande non trouvée")
  })
  ResponseEntity<CommandeClientDto> findById(@PathVariable Integer idCommandeClient);

  @GetMapping(value = "/filter/{codeCommandeClient}")
  @Operation(summary = "Trouver une commande par code", description = "Récupère une commande client par son code")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Commande trouvée",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande non trouvée")
  })
  ResponseEntity<CommandeClientDto> findByCode(@PathVariable("codeCommandeClient") String code);

  @GetMapping(value = "/all")
  @Operation(summary = "Lister toutes les commandes", description = "Récupère la liste de toutes les commandes clients")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des commandes",
                  content = @Content(schema = @Schema(implementation = CommandeClientDto.class)))
  })
  ResponseEntity<List<CommandeClientDto>> findAll();

  @GetMapping(value = "/lignesCommande/{idCommande}")
  @Operation(summary = "Lister les lignes de commande", description = "Récupère toutes les lignes d'une commande client")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Lignes de commande trouvées",
                  content = @Content(schema = @Schema(implementation = LigneCommandeClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Commande non trouvée")
  })
  ResponseEntity<List<LigneCommandeClientDto>> findAllLignesCommandesClientByCommandeClientId(@PathVariable("idCommande") Integer idCommande);

  @DeleteMapping(value = "/delete/{idCommandeClient}")
  @Operation(summary = "Supprimer une commande", description = "Supprime une commande client par son identifiant")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Commande supprimée"),
          @ApiResponse(responseCode = "404", description = "Commande non trouvée")
  })
  ResponseEntity<Void> delete(@PathVariable("idCommandeClient") Integer id);
}