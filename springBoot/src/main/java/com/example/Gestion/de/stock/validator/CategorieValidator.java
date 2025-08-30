package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.CategorieDto;
import org.springframework.util.StringUtils;

public class CategorieValidator {

  public static List<String> validate(CategorieDto categorieDto) {
    List<String> errors = new ArrayList<>();

    if (categorieDto == null || !StringUtils.hasLength(categorieDto.getCode())) {
      errors.add("Veuillez renseigner le code de la categorie");
    }
    return errors;
  }

}
