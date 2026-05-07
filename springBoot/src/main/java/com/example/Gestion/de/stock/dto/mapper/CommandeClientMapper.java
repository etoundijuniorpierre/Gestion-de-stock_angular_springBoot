package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.CommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeClientResponseDto;
import com.example.Gestion.de.stock.model.entity.CommandeClient;
import java.util.stream.Collectors;

public class CommandeClientMapper {

    public static CommandeClient toEntity(CommandeClientRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        CommandeClient commandeClient = new CommandeClient();
        commandeClient.setCode(dto.getCode());
        commandeClient.setDateCommande(dto.getDateCommande());
        commandeClient.setEtatCommande(dto.getEtatCommande());
        commandeClient.setIdEntreprise(dto.getIdEntreprise());
        
        return commandeClient;
    }

    public static CommandeClientResponseDto fromEntity(CommandeClient commandeClient) {
        if (commandeClient == null) {
            return null;
        }
        
        CommandeClientResponseDto.CommandeClientResponseDtoBuilder builder = CommandeClientResponseDto.builder()
                .id(commandeClient.getId())
                .code(commandeClient.getCode())
                .dateCommande(commandeClient.getDateCommande())
                .etatCommande(commandeClient.getEtatCommande())
                .client(ClientMapper.fromEntity(commandeClient.getClient()))
                .idEntreprise(commandeClient.getIdEntreprise());
        
        // Map lignes de commande if they exist
        if (commandeClient.getLigneCommandeClients() != null) {
            builder.ligneCommandeClients(
                commandeClient.getLigneCommandeClients().stream()
                    .map(LigneCommandeClientMapper::fromEntity)
                    .collect(Collectors.toList())
            );
        }
        
        return builder.build();
    }
}