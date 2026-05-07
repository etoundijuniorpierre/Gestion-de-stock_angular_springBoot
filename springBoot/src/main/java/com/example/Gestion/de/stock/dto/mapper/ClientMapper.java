package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.ClientRequestDto;
import com.example.Gestion.de.stock.dto.response.ClientResponseDto;
import com.example.Gestion.de.stock.model.entity.Client;

public class ClientMapper {

    public static Client toEntity(ClientRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Client client = new Client();
        client.setNom(dto.getNom());
        client.setPrenom(dto.getPrenom());
        client.setAdresse(AdresseMapper.toEntity(dto.getAdresse()));
        client.setPhoto(dto.getPhoto());
        client.setMail(dto.getMail());
        client.setNumTel(dto.getNumTel());
        client.setIdEntreprise(dto.getIdEntreprise());
        
        return client;
    }

    public static ClientResponseDto fromEntity(Client client) {
        if (client == null) {
            return null;
        }
        
        return ClientResponseDto.builder()
                .id(client.getId())
                .nom(client.getNom())
                .prenom(client.getPrenom())
                .adresse(AdresseMapper.fromEntity(client.getAdresse()))
                .photo(client.getPhoto())
                .mail(client.getMail())
                .numTel(client.getNumTel())
                .idEntreprise(client.getIdEntreprise())
                .build();
    }
}