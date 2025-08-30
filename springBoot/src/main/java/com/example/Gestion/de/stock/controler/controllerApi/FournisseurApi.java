package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.FournisseurDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.example.Gestion.de.stock.utils.Constants.FOURNISSEUR_ENDPOINT;

@Tag(name = "Fournisseur", description = "Gestion des fournisseurs")
public interface FournisseurApi {

  @Operation(summary = "Créer un fournisseur", description = "Enregistre ou modifie un fournisseur")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur enregistré", content = @Content(schema = @Schema(implementation = FournisseurDto.class)))
  })
  @PostMapping(FOURNISSEUR_ENDPOINT + "/create")
  FournisseurDto save(@RequestBody FournisseurDto dto);

  @Operation(summary = "Rechercher un fournisseur par ID", description = "Retourne un fournisseur avec l'identifiant fourni")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur trouvé", content = @Content(schema = @Schema(implementation = FournisseurDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun fournisseur trouvé avec cet ID")
  })
  @GetMapping(FOURNISSEUR_ENDPOINT + "/{idFournisseur}")
  FournisseurDto findById(@Parameter(description = "ID du fournisseur") @PathVariable("idFournisseur") Integer id);

  @Operation(summary = "Lister tous les fournisseurs", description = "Retourne la liste complète des fournisseurs")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des fournisseurs", content = @Content(schema = @Schema(implementation = FournisseurDto.class)))
  })
  @GetMapping(FOURNISSEUR_ENDPOINT + "/all")
  List<FournisseurDto> findAll();

  @Operation(summary = "Supprimer un fournisseur", description = "Supprime un fournisseur à partir de son identifiant")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur supprimé")
  })
  @DeleteMapping(FOURNISSEUR_ENDPOINT + "/delete/{idFournisseur}")
  void delete(@Parameter(description = "ID du fournisseur à supprimer") @PathVariable("idFournisseur") Integer id);
}
