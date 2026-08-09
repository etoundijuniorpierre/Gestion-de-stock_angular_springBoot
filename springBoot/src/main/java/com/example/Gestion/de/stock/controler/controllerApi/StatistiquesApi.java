package com.example.Gestion.de.stock.controler.controllerApi;

import com.example.Gestion.de.stock.dto.StatistiquesDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@Tag(name = "Statistiques", description = "Api pour le dashboard et les statistiques")
@RequestMapping(APP_ROOT + "/statistiques")
public interface StatistiquesApi {

    @GetMapping(path = "/summary", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Recuperer les statistiques", description = "Cette methode permet de recuperer les statistiques globales de l'application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "L'objet contenant les statistiques",
                    content = @Content(schema = @Schema(implementation = StatistiquesDto.class)))
    })
    StatistiquesDto getStatistiques();
}
