package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;


import com.example.Gestion.de.stock.dto.request.AdresseRequestDto;
import com.example.Gestion.de.stock.model.entity.Adresse;
import org.springframework.util.StringUtils;

public class AdresseValidator {

  public static List<String> validate(AdresseRequestDto adresseDto) {
    List<String> errors = new ArrayList<>();

    if (adresseDto == null) {
      errors.add("Veuillez renseigner l'adresse 1'");
      errors.add("Veuillez renseigner la ville'");
      errors.add("Veuillez renseigner le pays'");
      errors.add("Veuillez renseigner le code postal'");
      return errors;
    }
    if (!StringUtils.hasLength(adresseDto.getAdresse1())) {
      errors.add("Veuillez renseigner l'adresse 1'");
    }
    if (!StringUtils.hasLength(adresseDto.getVille())) {
      errors.add("Veuillez renseigner la ville'");
    }
    if (!StringUtils.hasLength(adresseDto.getPays())) {
      errors.add("Veuillez renseigner le pays'");
    }
    if (!StringUtils.hasLength(adresseDto.getCodePostale())) {
      errors.add("Veuillez renseigner le code postal'");
    }
    return errors;
  }

  public static List<String> validateEntity(Adresse adresse) {
    List<String> errors = new ArrayList<>();

    if (adresse == null) {
      errors.add("Veuillez renseigner l'adresse 1'");
      errors.add("Veuillez renseigner la ville'");
      errors.add("Veuillez renseigner le pays'");
      errors.add("Veuillez renseigner le code postal'");
      return errors;
    }
    if (!StringUtils.hasLength(adresse.getAdresse1())) {
      errors.add("Veuillez renseigner l'adresse 1'");
    }
    if (!StringUtils.hasLength(adresse.getVille())) {
      errors.add("Veuillez renseigner la ville'");
    }
    if (!StringUtils.hasLength(adresse.getPays())) {
      errors.add("Veuillez renseigner le pays'");
    }
    if (!StringUtils.hasLength(adresse.getCodePostale())) {
      errors.add("Veuillez renseigner le code postal'");
    }
    return errors;
  }

}