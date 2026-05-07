package com.example.Gestion.de.stock.controler.controllerApi;

import static com.example.Gestion.de.stock.utils.Constants.UTILISATEUR_ENDPOINT;

import com.example.Gestion.de.stock.dto.request.ChangerMotDePasseUtilisateurDto;
import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Utilisateurs", description = "Gestion des utilisateurs")
public interface UtilisateurApi {

  @Operation(summary = "Créer un utilisateur", description = "Cette méthode permet d'enregistrer ou de modifier un utilisateur")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'objet utilisateur créé ou modifié", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class)))
  })
  @PostMapping(UTILISATEUR_ENDPOINT + "/create")
  UtilisateurResponseDto save(@RequestBody UtilisateurRequestDto dto);

  @Operation(summary = "Mettre à jour un utilisateur", description = "Cette méthode permet de mettre à jour les informations d'un utilisateur")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "L'objet utilisateur mis à jour", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class)))
  })
  @PutMapping(UTILISATEUR_ENDPOINT + "/update/{id}")
  UtilisateurResponseDto updateUser(@PathVariable("id") Integer id, @RequestBody UtilisateurRequestDto dto);

  @Operation(summary = "Changer le mot de passe", description = "Cette méthode permet de changer le mot de passe d’un utilisateur")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Mot de passe mis à jour", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class)))
  })
  @PostMapping(UTILISATEUR_ENDPOINT + "/update/password")
  UtilisateurResponseDto changerMotDePasse(@RequestBody ChangerMotDePasseUtilisateurDto dto);

  @Operation(summary = "Rechercher un utilisateur par ID", description = "Cette méthode permet de chercher un utilisateur par son ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Utilisateur trouvé", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun utilisateur n'existe avec cet ID")
  })
  @GetMapping(UTILISATEUR_ENDPOINT + "/{idUtilisateur}")
  UtilisateurResponseDto findById(@Parameter(description = "ID de l'utilisateur") @PathVariable("idUtilisateur") Integer id);

  @Operation(summary = "Rechercher un utilisateur par email", description = "Cette méthode permet de chercher un utilisateur par son email")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Utilisateur trouvé", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class))),
          @ApiResponse(responseCode = "404", description = "Aucun utilisateur n'existe avec cet email")
  })
  @GetMapping(UTILISATEUR_ENDPOINT + "/find/{email}")
  UtilisateurResponseDto findByEmail(@Parameter(description = "Email de l'utilisateur") @PathVariable("email") String email);

  @Operation(summary = "Lister tous les utilisateurs", description = "Cette méthode permet de retourner la liste de tous les utilisateurs")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Liste des utilisateurs", content = @Content(schema = @Schema(implementation = UtilisateurResponseDto.class)))
  })
  @GetMapping(UTILISATEUR_ENDPOINT + "/all")
  List<UtilisateurResponseDto> findAll();

  @Operation(summary = "Supprimer un utilisateur", description = "Cette méthode permet de supprimer un utilisateur par ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Utilisateur supprimé")
  })
  @DeleteMapping(UTILISATEUR_ENDPOINT + "/delete/{idUtilisateur}")
  void delete(@Parameter(description = "ID de l'utilisateur à supprimer") @PathVariable("idUtilisateur") Integer id);
}