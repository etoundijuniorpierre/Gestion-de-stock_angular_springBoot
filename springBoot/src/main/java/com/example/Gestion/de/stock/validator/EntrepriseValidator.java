package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import com.example.Gestion.de.stock.model.entity.Entreprise;
import org.springframework.util.StringUtils;

public class EntrepriseValidator {

  public static List<String> validate(EntrepriseRequestDto entrepriseDto) {
    List<String> errors = new ArrayList<>();
    if (entrepriseDto == null) {
      errors.add("Veuillez renseigner le nom de l'entreprise");
      errors.add("Veuillez reseigner la description de l'entreprise");
      errors.add("Veuillez reseigner le code fiscal de l'entreprise");
      errors.add("Veuillez reseigner l'email de l'entreprise");
      errors.add("Veuillez reseigner le numero de telephone de l'entreprise");
      errors.addAll(AdresseValidator.validate(null));
      return errors;
    }

    if (!StringUtils.hasLength(entrepriseDto.getNom())) {
      errors.add("Veuillez renseigner le nom de l'entreprise");
    }
    if (!StringUtils.hasLength(entrepriseDto.getDescription())) {
      errors.add("Veuillez reseigner la description de l'entreprise");
    }
    if (!StringUtils.hasLength(entrepriseDto.getCodeFiscal())) {
      errors.add("Veuillez reseigner le code fiscal de l'entreprise");
    }
    if (!StringUtils.hasLength(entrepriseDto.getEmail())) {
      errors.add("Veuillez reseigner l'email de l'entreprise");
    }
    if (!StringUtils.hasLength(entrepriseDto.getNumTel())) {
      errors.add("Veuillez reseigner le numero de telephone de l'entreprise");
    }

    errors.addAll(AdresseValidator.validate(entrepriseDto.getAdresse()));
    return errors;
  }

  public static List<String> validateEntity(Entreprise entreprise) {
    List<String> errors = new ArrayList<>();
    if (entreprise == null) {
      errors.add("Veuillez renseigner le nom de l'entreprise");
      errors.add("Veuillez reseigner la description de l'entreprise");
      errors.add("Veuillez reseigner le code fiscal de l'entreprise");
      errors.add("Veuillez reseigner l'email de l'entreprise");
      errors.add("Veuillez reseigner le numero de telephone de l'entreprise");
      errors.addAll(AdresseValidator.validateEntity(null));
      return errors;
    }

    if (!StringUtils.hasLength(entreprise.getNom())) {
      errors.add("Veuillez renseigner le nom de l'entreprise");
    }
    if (!StringUtils.hasLength(entreprise.getDescription())) {
      errors.add("Veuillez reseigner la description de l'entreprise");
    }
    if (!StringUtils.hasLength(entreprise.getCodeFiscal())) {
      errors.add("Veuillez reseigner le code fiscal de l'entreprise");
    }
    if (!StringUtils.hasLength(entreprise.getEmail())) {
      errors.add("Veuillez reseigner l'email de l'entreprise");
    }
    if (!StringUtils.hasLength(entreprise.getNumTel())) {
      errors.add("Veuillez reseigner le numero de telephone de l'entreprise");
    }

    errors.addAll(AdresseValidator.validateEntity(entreprise.getAdresse()));
    return errors;
  }

}