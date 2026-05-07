package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;


import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.model.entity.Ventes;
import org.springframework.util.StringUtils;

public class VentesValidator {

  public static List<String> validate(VentesRequestDto ventesDto) {
    List<String> errors = new ArrayList<>();
    if (ventesDto == null) {
      errors.add("Veuillez renseigner le code de la commande");
      errors.add("Veuillez renseigner la date de la commande");
      return errors;
    }

    if (!StringUtils.hasLength(ventesDto.getCode())) {
      errors.add("Veuillez renseigner le code de la commande");
    }
    if (ventesDto.getDateVente() == null) {
      errors.add("Veuillez renseigner la date de la commande");
    }

    return errors;
  }

  public static List<String> validateEntity(Ventes ventes) {
    List<String> errors = new ArrayList<>();
    if (ventes == null) {
      errors.add("Veuillez renseigner le code de la commande");
      errors.add("Veuillez renseigner la date de la commande");
      return errors;
    }

    if (!StringUtils.hasLength(ventes.getCode())) {
      errors.add("Veuillez renseigner le code de la commande");
    }
    if (ventes.getDateVente() == null) {
      errors.add("Veuillez renseigner la date de la commande");
    }

    return errors;
  }

}