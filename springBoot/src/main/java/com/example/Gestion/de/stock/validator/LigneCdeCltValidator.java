package com.example.Gestion.de.stock.validator;
import com.example.Gestion.de.stock.dto.LigneCommandeClientDto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class LigneCdeCltValidator {

  // TODO to be implemented
  public static List<String> validate(LigneCommandeClientDto dto) {
    List<String> errors = new ArrayList<>();

    if(dto == null) {
      errors.add("Veuillez renseigner une quantité");
      errors.add("Veuillez renseigner un prix ");
      errors.add("Veuillez renseigner le client");
      errors.add("Veuillez renseigne l'article");
      return errors;
    }
     if(dto.getQuantite()==null || dto.getQuantite().compareTo(BigDecimal.ONE)==0){
       errors.add("Veuillez renseigner une quantite");

    }
    if(dto.getPrixUnitaire()==null || dto.getPrixUnitaire().compareTo(BigDecimal.ONE)==0){
      errors.add("Veuillez renseigner un prix");

    }
    if(dto.getCommandeClient()==null || dto.getCommandeClient().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }
    if(dto.getArticle()==null || dto.getArticle().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }

    return errors;
  }

}
