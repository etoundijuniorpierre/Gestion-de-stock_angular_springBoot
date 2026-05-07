package com.example.Gestion.de.stock.validator;

import com.example.Gestion.de.stock.dto.request.LigneCommandeClientRequestDto;
import com.example.Gestion.de.stock.model.entity.LigneCommandeClient;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class LigneCdeCltValidator {

  public static List<String> validate(LigneCommandeClientRequestDto ligneCommandeClientDto) {
    List<String> errors = new ArrayList<>();

    if(ligneCommandeClientDto == null) {
      errors.add("Veuillez renseigner une quantité");
      errors.add("Veuillez renseigner un prix ");
      errors.add("Veuillez renseigner le client");
      errors.add("Veuillez renseigne l'article");
      return errors;
    }
     if(ligneCommandeClientDto.getQuantite()==null || ligneCommandeClientDto.getQuantite().compareTo(BigDecimal.ONE)==0){
       errors.add("Veuillez renseigner une quantite");

    }
    if(ligneCommandeClientDto.getPrixUnitaire()==null || ligneCommandeClientDto.getPrixUnitaire().compareTo(BigDecimal.ONE)==0){
      errors.add("Veuillez renseigner un prix");

    }
    if(ligneCommandeClientDto.getCommandeClient()==null) {
      errors.add("Veuillez renseigner une commande");
    }
    if(ligneCommandeClientDto.getIdArticle() == null) {
      errors.add("Veuillez renseigner une commande");
    }

    return errors;
  }

  // TODO to be implemented
  public static List<String> validateEntity(LigneCommandeClient ligneCommandeClient) {
    List<String> errors = new ArrayList<>();

    if(ligneCommandeClient == null) {
      errors.add("Veuillez renseigner une quantité");
      errors.add("Veuillez renseigner un prix ");
      errors.add("Veuillez renseigner le client");
      errors.add("Veuillez renseigne l'article");
      return errors;
    }
     if(ligneCommandeClient.getQuantite()==null || ligneCommandeClient.getQuantite().compareTo(BigDecimal.ONE)==0){
       errors.add("Veuillez renseigner une quantite");

    }
    if(ligneCommandeClient.getPrixUnitaire()==null || ligneCommandeClient.getPrixUnitaire().compareTo(BigDecimal.ONE)==0){
      errors.add("Veuillez renseigner un prix");

    }
    if(ligneCommandeClient.getCommandeClient()==null || ligneCommandeClient.getCommandeClient().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }
    if(ligneCommandeClient.getArticle()==null || ligneCommandeClient.getArticle().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }

    return errors;
  }

}