package com.example.Gestion.de.stock.controler.controllerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

import com.example.Gestion.de.stock.dto.ArticleDto;
import com.example.Gestion.de.stock.dto.LigneCommandeClientDto;
import com.example.Gestion.de.stock.dto.LigneCommandeFournisseurDto;
import com.example.Gestion.de.stock.dto.LigneVenteDto;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@Tag(name = "Gestion des Articles", description = "Api pour la gestion des Articles")
@RequestMapping(APP_ROOT + "/articles")
public interface ArticleControllerApi {

  @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Enregistrer un article", description = "Cette methode permet d'enregistrer ou modifier un article")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'objet article cree / modifie",
                  content = @Content(schema = @Schema(implementation = ArticleDto.class))),
          @ApiResponse(responseCode = "400", description = "L'objet article n'est pas valide")
  })
  ArticleDto save(@RequestBody ArticleDto dto);

  @GetMapping(path = "/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Rechercher un article par ID", description = "Cette methode permet de chercher un article par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'article a ete trouve dans la BDD",
                  content = @Content(schema = @Schema(implementation = ArticleDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun article n'existe dans la BDD avec l'ID fourni")
  })
  ArticleDto findById(@PathVariable("idArticle") Integer id);

  @GetMapping(path = "/filter/{codeArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Rechercher un article par code", description = "Cette methode permet de chercher un article par son code")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'article a ete trouve dans la BDD",
                  content = @Content(schema = @Schema(implementation = ArticleDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun article n'existe dans la BDD avec le code fourni")
  })
  ArticleDto findArticleByCodeArticle(@PathVariable("codeArticle") String codeArticle);

  @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Renvoi la liste des articles", description = "Cette methode permet de chercher et renvoyer la liste des articles qui existent dans la BDD")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "La liste des article / Une liste vide",
                  content = @Content(schema = @Schema(implementation = ArticleDto.class)))
  })
  List<ArticleDto> findAll();

  @GetMapping(path = "/historique/vente/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Historique des ventes d'un article", description = "Cette methode permet de recuperer l'historique des ventes d'un article")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des ventes de l'article",
                  content = @Content(schema = @Schema(implementation = LigneVenteDto.class)))
  })
  List<LigneVenteDto> findHistoriqueVentes(@PathVariable("idArticle") Integer idArticle);

  @GetMapping(path = "/historique/commandeclient/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Historique des commandes clients d'un article", description = "Cette methode permet de recuperer l'historique des commandes clients d'un article")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des commandes clients de l'article",
                  content = @Content(schema = @Schema(implementation = LigneCommandeClientDto.class)))
  })
  List<LigneCommandeClientDto> findHistoriqueCommandeClient(@PathVariable("idArticle") Integer idArticle);

  @GetMapping(path = "/historique/commandefournisseur/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Historique des commandes fournisseurs d'un article", description = "Cette methode permet de recuperer l'historique des commandes fournisseurs d'un article")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des commandes fournisseurs de l'article",
                  content = @Content(schema = @Schema(implementation = LigneCommandeFournisseurDto.class)))
  })
  List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(@PathVariable("idArticle") Integer idArticle);

  @GetMapping(path = "/filter/category/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Rechercher des articles par categorie", description = "Cette methode permet de chercher des articles par categorie")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des articles de la categorie",
                  content = @Content(schema = @Schema(implementation = ArticleDto.class)))
  })
  List<ArticleDto> findAllArticleByIdCategorie(@PathVariable("idCategory") Integer idCategory);

  @DeleteMapping(path = "/delete/{idArticle}")
  @Operation(summary = "Supprimer un article", description = "Cette methode permet de supprimer un article par ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'article a ete supprime")
  })
  void delete(@PathVariable("idArticle") Integer id);
}