package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.CommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.CommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.model.entity.CommandeFournisseur;
import java.util.stream.Collectors;

public class CommandeFournisseurMapper {

    public static CommandeFournisseur toEntity(CommandeFournisseurRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        CommandeFournisseur commandeFournisseur = new CommandeFournisseur();
        commandeFournisseur.setCode(dto.getCode());
        commandeFournisseur.setDateCommande(dto.getDateCommande());
        commandeFournisseur.setEtatCommande(dto.getEtatCommande());
        commandeFournisseur.setIdEntreprise(dto.getIdEntreprise());
        
        return commandeFournisseur;
    }

    public static CommandeFournisseurResponseDto fromEntity(CommandeFournisseur commandeFournisseur) {
        if (commandeFournisseur == null) {
            return null;
        }
        
        CommandeFournisseurResponseDto.CommandeFournisseurResponseDtoBuilder builder = CommandeFournisseurResponseDto.builder()
                .id(commandeFournisseur.getId())
                .code(commandeFournisseur.getCode())
                .dateCommande(commandeFournisseur.getDateCommande())
                .etatCommande(commandeFournisseur.getEtatCommande())
                .fournisseur(FournisseurMapper.fromEntity(commandeFournisseur.getFournisseur()))
                .idEntreprise(commandeFournisseur.getIdEntreprise());
        
        // Map lignes de commande if they exist
        if (commandeFournisseur.getLigneCommandeFournisseurs() != null) {
            builder.ligneCommandeFournisseurs(
                commandeFournisseur.getLigneCommandeFournisseurs().stream()
                    .map(LigneCommandeFournisseurMapper::fromEntity)
                    .collect(Collectors.toList())
            );
        }
        
        return builder.build();
    }
}