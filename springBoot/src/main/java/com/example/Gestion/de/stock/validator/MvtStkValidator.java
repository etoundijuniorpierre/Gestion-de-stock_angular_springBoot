package com.example.Gestion.de.stock.validator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.model.entity.MvtStk;
import org.springframework.util.StringUtils;

public class MvtStkValidator {

  public static List<String> validate(MvtStkRequestDto mvtStkDto) {
    List<String> errors = new ArrayList<>();
    if (mvtStkDto == null) {
      errors.add("Veuillez renseigner la date du mouvenent");
      errors.add("Veuillez renseigner la quantite du mouvenent");
      errors.add("Veuillez renseigner l'article");
      errors.add("Veuillez renseigner le type du mouvement");

      return errors;
    }
    if (mvtStkDto.getDateMvt() == null) {
      errors.add("Veuillez renseigner la date du mouvenent");
    }
    if (mvtStkDto.getQuantite() == null || mvtStkDto.getQuantite().compareTo(BigDecimal.ZERO) == 0) {
      errors.add("Veuillez renseigner la quantite du mouvenent");
    }
    // Check if either article object or article ID is provided
    if (mvtStkDto.getArticle() == null && mvtStkDto.getIdArticle() == null) {
      errors.add("Veuillez renseigner l'article");
    }
    if (mvtStkDto.getTypeMvt() == null) {
      errors.add("Veuillez renseigner le type du mouvement");
    }

    return errors;
  }

  public static List<String> validateEntity(MvtStk mvtStk) {
    List<String> errors = new ArrayList<>();
    if (mvtStk == null) {
      errors.add("Veuillez renseigner la date du mouvenent");
      errors.add("Veuillez renseigner la quantite du mouvenent");
      errors.add("Veuillez renseigner l'article");
      errors.add("Veuillez renseigner le type du mouvement");

      return errors;
    }
    if (mvtStk.getDateMvt() == null) {
      errors.add("Veuillez renseigner la date du mouvenent");
    }
    if (mvtStk.getQuantite() == null || mvtStk.getQuantite().compareTo(BigDecimal.ZERO) == 0) {
      errors.add("Veuillez renseigner la quantite du mouvenent");
    }
    if (mvtStk.getArticle() == null || mvtStk.getArticle().getId() == null) {
      errors.add("Veuillez renseigner l'article");
    }
    if (mvtStk.getTypeMvt() == null) {
      errors.add("Veuillez renseigner le type du mouvement");
    }

    return errors;
  }

}