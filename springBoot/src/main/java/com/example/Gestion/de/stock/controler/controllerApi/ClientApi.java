package com.example.Gestion.de.stock.controler.controllerApi;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

import com.example.Gestion.de.stock.dto.ClientDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Clients", description = "API pour la gestion des clients")
@RequestMapping(APP_ROOT + "/clients")
public interface ClientApi {

  @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Enregistrer un client", description = "Cette méthode permet d'enregistrer ou modifier un client")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Client enregistré/modifié",
                  content = @Content(schema = @Schema(implementation = ClientDto.class))),
          @ApiResponse(responseCode = "400", description = "Client non valide")
  })
  ClientDto save(@RequestBody ClientDto dto);

  @GetMapping(value = "/{idClient}", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Trouver un client par ID", description = "Cette méthode permet de chercher un client par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Client trouvé",
                  content = @Content(schema = @Schema(implementation = ClientDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun client trouvé avec l'ID fourni")
  })
  ClientDto findById(@PathVariable("idClient") Integer id);

  @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Lister les clients", description = "Cette méthode permet de lister tous les clients")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des clients",
                  content = @Content(schema = @Schema(implementation = ClientDto.class)))
  })
  List<ClientDto> findAll();

  @DeleteMapping(value = "/delete/{idClient}")
  @Operation(summary = "Supprimer un client", description = "Cette méthode permet de supprimer un client par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Client supprimé"),
          @ApiResponse(responseCode = "404", description = "Aucun client trouvé avec l'ID fourni")
  })
  void delete(@PathVariable("idClient") Integer id);
}