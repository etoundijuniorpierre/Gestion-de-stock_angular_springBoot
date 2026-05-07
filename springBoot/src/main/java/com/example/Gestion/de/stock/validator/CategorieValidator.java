package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.CategorieRequestDto;
import com.example.Gestion.de.stock.model.entity.Categorie;
import org.springframework.util.StringUtils;

public class CategorieValidator {

  public static List<String> validate(CategorieRequestDto categorieRequestDto) {
    List<String> errors = new ArrayList<>();

    if (categorieRequestDto == null || !StringUtils.hasLength(categorieRequestDto.getCode())) {
      errors.add("Veuillez renseigner le code de la categorie");
    }
    return errors;
  }

  public static List<String> validateEntity(Categorie categorie) {
    List<String> errors = new ArrayList<>();

    if (categorie == null || !StringUtils.hasLength(categorie.getCode())) {
      errors.add("Veuillez renseigner le code de la categorie");
    }
    return errors;
  }

}