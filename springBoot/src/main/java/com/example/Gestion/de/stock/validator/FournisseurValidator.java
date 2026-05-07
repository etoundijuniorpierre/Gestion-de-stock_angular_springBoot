package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.model.entity.Fournisseur;
import org.springframework.util.StringUtils;

public class FournisseurValidator {

  public static List<String> validate(FournisseurRequestDto fournisseurDto) {
    List<String> errors = new ArrayList<>();

    if (fournisseurDto == null) {
      errors.add("Veuillez renseigner le nom du fournisseur");
      errors.add("Veuillez renseigner le prenom du fournisseur");
      errors.add("Veuillez renseigner le Mail du fournisseur");
      errors.add("Veuillez renseigner le numero de telephone du fournisseur");
      errors.addAll(AdresseValidator.validate(null));
      return errors;
    }

    if (!StringUtils.hasLength(fournisseurDto.getNom())) {
      errors.add("Veuillez renseigner le nom du fournisseur");
    }
//    if (!StringUtils.hasLength(fournisseurDto.getPrenom())) {
//      errors.add("Veuillez renseigner le prenom du fournisseur");
//    }
//    if (!StringUtils.hasLength(fournisseurDto.getMail())) {
//      errors.add("Veuillez renseigner le Mail du fournisseur");
//    }
    if (!StringUtils.hasLength(fournisseurDto.getNumTel())) {
      errors.add("Veuillez renseigner le numero de telephone du fournisseur");
    }
    errors.addAll(AdresseValidator.validate(fournisseurDto.getAdresse()));
    return errors;
  }

  public static List<String> validateEntity(Fournisseur fournisseur) {
    List<String> errors = new ArrayList<>();

    if (fournisseur == null) {
      errors.add("Veuillez renseigner le nom du fournisseur");
      errors.add("Veuillez renseigner le prenom du fournisseur");
      errors.add("Veuillez renseigner le Mail du fournisseur");
      errors.add("Veuillez renseigner le numero de telephone du fournisseur");
      errors.addAll(AdresseValidator.validateEntity(null));
      return errors;
    }

    if (!StringUtils.hasLength(fournisseur.getNom())) {
      errors.add("Veuillez renseigner le nom du fournisseur");
    }
//    if (!StringUtils.hasLength(fournisseur.getPrenom())) {
//      errors.add("Veuillez renseigner le prenom du fournisseur");
//    }
//    if (!StringUtils.hasLength(fournisseur.getMail())) {
//      errors.add("Veuillez renseigner le Mail du fournisseur");
//    }
    if (!StringUtils.hasLength(fournisseur.getNumTel())) {
      errors.add("Veuillez renseigner le numero de telephone du fournisseur");
    }
    errors.addAll(AdresseValidator.validateEntity(fournisseur.getAdresse()));
    return errors;
  }
}