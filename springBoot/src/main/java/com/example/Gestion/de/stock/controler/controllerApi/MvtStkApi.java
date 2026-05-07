package com.example.Gestion.de.stock.controler.controllerApi;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.bind.annotation.*;


@Tag(name = "Mouvements de stock", description = "API pour la gestion des mouvements de stock")
@RequestMapping(APP_ROOT + "/mvtstk")
public interface MvtStkApi {

  @Operation(summary = "Stock réel", description = "Retourne le stock réel d'un article donné")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Stock réel retourné", content = @Content(schema = @Schema(implementation = BigDecimal.class))),
          @ApiResponse(responseCode = "404", description = "Article non trouvé")
  })
  @GetMapping("/stockreel/{idArticle}")
  BigDecimal stockReelArticle(@Parameter(description = "ID de l'article") @PathVariable("idArticle") Integer idArticle);

  @Operation(summary = "Historique des mouvements d'un article", description = "Retourne tous les mouvements de stock liés à un article donné")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des mouvements retournée", content = @Content(schema = @Schema(implementation = MvtStkResponseDto.class)))
  })
  @GetMapping("/filter/article/{idArticle}")
  List<MvtStkResponseDto> mvtStkArticle(@Parameter(description = "ID de l'article") @PathVariable("idArticle") Integer idArticle);

  @Operation(summary = "Entrée de stock", description = "Enregistre une entrée de stock")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Entrée de stock enregistrée", content = @Content(schema = @Schema(implementation = MvtStkResponseDto.class)))
  })
  @PostMapping("/entree")
  MvtStkResponseDto entreeStock(@RequestBody MvtStkRequestDto dto);

  @Operation(summary = "Sortie de stock", description = "Enregistre une sortie de stock")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Sortie de stock enregistrée", content = @Content(schema = @Schema(implementation = MvtStkResponseDto.class)))
  })
  @PostMapping("/sortie")
  MvtStkResponseDto sortieStock(@RequestBody MvtStkRequestDto dto);

  @Operation(summary = "Correction positive de stock", description = "Enregistre une correction positive du stock")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Correction positive enregistrée", content = @Content(schema = @Schema(implementation = MvtStkResponseDto.class)))
  })
  @PostMapping("/correctionpos")
  MvtStkResponseDto correctionStockPos(@RequestBody MvtStkRequestDto dto);

  @Operation(summary = "Correction négative de stock", description = "Enregistre une correction négative du stock")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Correction négative enregistrée", content = @Content(schema = @Schema(implementation = MvtStkResponseDto.class)))
  })
  @PostMapping("/correctionneg")
  MvtStkResponseDto correctionStockNeg(@RequestBody MvtStkRequestDto dto);
}
