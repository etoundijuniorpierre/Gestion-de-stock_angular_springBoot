package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import static com.example.Gestion.de.stock.utils.Constants.VENTES_ENDPOINT;

@Tag(name = "Ventes", description = "Gestion des ventes")
public interface VentesApi {

  @Operation(summary = "Créer une vente", description = "Permet d'enregistrer une vente")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Vente créée", content = @Content(schema = @Schema(implementation = VentesResponseDto.class)))
  })
  @PostMapping(VENTES_ENDPOINT + "/create")
  VentesResponseDto save(@RequestBody VentesRequestDto dto);

  @Operation(summary = "Rechercher une vente par ID", description = "Permet de rechercher une vente par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Vente trouvée", content = @Content(schema = @Schema(implementation = VentesResponseDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucune vente trouvée avec cet ID")
  })
  @GetMapping(VENTES_ENDPOINT + "/{idVente}")
  VentesResponseDto findById(@Parameter(description = "ID de la vente") @PathVariable("idVente") Integer id);

  @Operation(summary = "Rechercher une vente par code", description = "Permet de rechercher une vente par son code")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Vente trouvée", content = @Content(schema = @Schema(implementation = VentesResponseDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucune vente trouvée avec ce code")
  })
  @GetMapping(VENTES_ENDPOINT + "/{codeVente}")
  VentesResponseDto findByCode(@Parameter(description = "Code de la vente") @PathVariable("codeVente") String code);

  @Operation(summary = "Liste de toutes les ventes", description = "Permet de récupérer toutes les ventes enregistrées")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des ventes", content = @Content(schema = @Schema(implementation = VentesResponseDto.class)))
  })
  @GetMapping(VENTES_ENDPOINT + "/all")
  List<VentesResponseDto> findAll();

  @Operation(summary = "Supprimer une vente", description = "Permet de supprimer une vente par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Vente supprimée")
  })
  @DeleteMapping(VENTES_ENDPOINT + "/delete/{idVente}")
  void delete(@Parameter(description = "ID de la vente à supprimer") @PathVariable("idVente") Integer id);
}