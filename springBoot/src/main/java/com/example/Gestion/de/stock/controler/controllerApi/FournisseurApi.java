package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.Gestion.de.stock.utils.Constants.FOURNISSEUR_ENDPOINT;

@Tag(name = "Fournisseur", description = "Gestion des fournisseurs")
@RequestMapping(FOURNISSEUR_ENDPOINT)
public interface FournisseurApi {

  @Operation(summary = "Créer un fournisseur", description = "Enregistre ou modifie un fournisseur")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur enregistré", content = @Content(schema = @Schema(implementation = FournisseurResponseDto.class)))
  })
  @PostMapping("/create")
  FournisseurResponseDto save(@RequestBody FournisseurRequestDto dto);

  @Operation(summary = "Rechercher un fournisseur par ID", description = "Retourne un fournisseur avec l'identifiant fourni")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur trouvé", content = @Content(schema = @Schema(implementation = FournisseurResponseDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun fournisseur trouvé avec cet ID")
  })
  @GetMapping("/{idFournisseur}")
  FournisseurResponseDto findById(@Parameter(description = "ID du fournisseur") @PathVariable("idFournisseur") Integer id);

  @Operation(summary = "Lister tous les fournisseurs", description = "Retourne la liste complète des fournisseurs")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des fournisseurs", content = @Content(schema = @Schema(implementation = FournisseurResponseDto.class)))
  })
  @GetMapping("/all")
  List<FournisseurResponseDto> findAll();

  @Operation(summary = "Supprimer un fournisseur", description = "Supprime un fournisseur à partir de son identifiant")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Fournisseur supprimé")
  })
  @DeleteMapping("/delete/{idFournisseur}")
  void delete(@Parameter(description = "ID du fournisseur à supprimer") @PathVariable("idFournisseur") Integer id);

  @PutMapping("/{id}")
  @Operation(summary = "mettre à jour un fournisseur", description = "Cette méthode permet de mettre à jour un fournisseur par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "fournisseur mis à jour"),
          @ApiResponse(responseCode = "404", description = "Aucun fournisseur trouvé avec l'ID fourni")
  })
  ResponseEntity<FournisseurResponseDto> update(@PathVariable Integer id, @RequestBody FournisseurRequestDto dto);
}