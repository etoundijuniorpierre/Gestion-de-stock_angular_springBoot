package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.dto.response.AdresseResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClientResponseDto {

  private Integer id;
  private String nom;
  private String prenom;
  private AdresseResponseDto adresse;
  private String photo;
  private String mail;
  private String numTel;
  private Integer idEntreprise;
}