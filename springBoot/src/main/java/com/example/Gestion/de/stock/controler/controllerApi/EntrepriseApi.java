package com.example.Gestion.de.stock.controler.controllerApi;

import static com.example.Gestion.de.stock.utils.Constants.ENTREPRISE_ENDPOINT;

import com.example.Gestion.de.stock.dto.EntrepriseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@Tag(name = "Entreprises", description = "API pour la gestion des entreprises")
public interface EntrepriseApi {

  @Operation(summary = "Créer une entreprise", description = "Permet d'enregistrer ou de modifier une entreprise")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Entreprise créée ou modifiée", content = @Content(schema = @Schema(implementation = EntrepriseDto.class)))
  })
  @PostMapping(ENTREPRISE_ENDPOINT + "/create")
  EntrepriseDto save(@RequestBody EntrepriseDto dto);

  @Operation(summary = "Rechercher une entreprise par ID", description = "Recherche une entreprise à partir de son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Entreprise trouvée", content = @Content(schema = @Schema(implementation = EntrepriseDto.class))),
          @ApiResponse(responseCode = "404", description = "Entreprise non trouvée")
  })
  @GetMapping(ENTREPRISE_ENDPOINT + "/{idEntreprise}")
  EntrepriseDto findById(@Parameter(description = "ID de l'entreprise") @PathVariable("idEntreprise") Integer id);

  @Operation(summary = "Lister toutes les entreprises", description = "Renvoie la liste de toutes les entreprises enregistrées")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des entreprises", content = @Content(schema = @Schema(implementation = EntrepriseDto.class)))
  })
  @GetMapping(ENTREPRISE_ENDPOINT + "/all")
  List<EntrepriseDto> findAll();

  @Operation(summary = "Supprimer une entreprise", description = "Suppression d'une entreprise par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Entreprise supprimée"),
          @ApiResponse(responseCode = "404", description = "Entreprise non trouvée")
  })
  @DeleteMapping(ENTREPRISE_ENDPOINT + "/delete/{idEntreprise}")
  void delete(@Parameter(description = "ID de l'entreprise à supprimer") @PathVariable("idEntreprise") Integer id);
}
