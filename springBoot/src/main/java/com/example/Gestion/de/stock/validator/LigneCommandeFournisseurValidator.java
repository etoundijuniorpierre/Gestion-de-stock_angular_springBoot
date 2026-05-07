package com.example.Gestion.de.stock.validator;

import com.example.Gestion.de.stock.dto.request.LigneCommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.model.entity.LigneCommandeFournisseur;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class LigneCommandeFournisseurValidator {

  public static List<String> validate(LigneCommandeFournisseurRequestDto ligneCommandeFournisseurDto) {
    List<String> errors = new ArrayList<>();

    if(ligneCommandeFournisseurDto == null) {
      errors.add("Veuillez renseigner une quantité");
      errors.add("Veuillez renseigner un prix ");
      errors.add("Veuillez renseigner le fournisseur");
      errors.add("Veuillez renseigner l'article");
      return errors;
    }
     if(ligneCommandeFournisseurDto.getQuantite()==null || ligneCommandeFournisseurDto.getQuantite().compareTo(BigDecimal.ONE)==0){
       errors.add("Veuillez renseigner une quantite");

    }
    if(ligneCommandeFournisseurDto.getPrixUnitaire()==null || ligneCommandeFournisseurDto.getPrixUnitaire().compareTo(BigDecimal.ONE)==0){
      errors.add("Veuillez renseigner un prix");

    }
    if(ligneCommandeFournisseurDto.getCommandeFournisseur()==null) {
      errors.add("Veuillez renseigner une commande");
    }
    if(ligneCommandeFournisseurDto.getIdArticle() == null) {
      errors.add("Veuillez renseigner une commande");
    }

    return errors;
  }

  public static List<String> validateEntity(LigneCommandeFournisseur ligneCommandeFournisseur) {
    List<String> errors = new ArrayList<>();

    if(ligneCommandeFournisseur == null) {
      errors.add("Veuillez renseigner une quantité");
      errors.add("Veuillez renseigner un prix ");
      errors.add("Veuillez renseigner le fournisseur");
      errors.add("Veuillez renseigner l'article");
      return errors;
    }
     if(ligneCommandeFournisseur.getQuantite()==null || ligneCommandeFournisseur.getQuantite().compareTo(BigDecimal.ONE)==0){
       errors.add("Veuillez renseigner une quantite");

    }
    if(ligneCommandeFournisseur.getPrixUnitaire()==null || ligneCommandeFournisseur.getPrixUnitaire().compareTo(BigDecimal.ONE)==0){
      errors.add("Veuillez renseigner un prix");

    }
    if(ligneCommandeFournisseur.getCommandeFournisseur()==null || ligneCommandeFournisseur.getCommandeFournisseur().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }
    if(ligneCommandeFournisseur.getArticle()==null || ligneCommandeFournisseur.getArticle().getId() == null) {
      errors.add("Veuillez renseigner une commande");
    }

    return errors;
  }

}