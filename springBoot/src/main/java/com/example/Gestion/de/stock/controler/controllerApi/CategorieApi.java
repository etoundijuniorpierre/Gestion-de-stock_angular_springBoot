package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.CategorieDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@Tag(name = "categories", description = "API pour les opérations sur les catégories")
@RequestMapping(APP_ROOT + "/categories")
public interface CategorieApi {

  @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Enregistrer une categorie", description = "Cette methode permet d'enregistrer ou modifier une categorie")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'objet Categorie cree / modifie",
                  content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @Schema(implementation = CategorieDto.class))),
          @ApiResponse(responseCode = "400", description = "L'objet Categorie n'est pas valide")
  })
  CategorieDto save(@RequestBody CategorieDto dto);

  @GetMapping(value = "/{idCategorie}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Rechercher une categorie par ID", description = "Cette methode permet de chercher une categorie par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "La categorie a ete trouve dans la BDD",
                  content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @Schema(implementation = CategorieDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucune categorie n'existe dans la BDD avec l'ID fourni")
  })
  CategorieDto findById(@PathVariable("idCategorie") Integer idCategorie);

  @GetMapping(value = "/filter/{codeCategorie}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Rechercher une categorie par CODE", description = "Cette methode permet de chercher une categorie par son CODE")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'article a ete trouve dans la BDD",
                  content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @Schema(implementation = CategorieDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun article n'existe dans la BDD avec le CODE fourni")
  })
  CategorieDto findByCode(@PathVariable("codeCategorie") String codeCategorie);

  @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Renvoi la liste des categories", description = "Cette methode permet de chercher et renvoyer la liste des categories qui existent dans la BDD")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "La liste des article / Une liste vide",
                  content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                          schema = @Schema(implementation = CategorieDto.class)))
  })
  List<CategorieDto> findAll();

  @DeleteMapping(value = "/delete/{idCategorie}")
  @Operation(summary = "Supprimer un article", description = "Cette methode permet de supprimer une categorie par ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "La categorie a ete supprime")
  })
  void delete(@PathVariable("idCategorie") Integer id);
}