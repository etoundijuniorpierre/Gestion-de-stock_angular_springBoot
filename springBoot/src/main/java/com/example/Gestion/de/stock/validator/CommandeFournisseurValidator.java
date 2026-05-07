package com.example.Gestion.de.stock.validator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.CommandeFournisseurRequestDto;
import com.example.Gestion.de.stock.model.entity.CommandeFournisseur;
import org.springframework.util.StringUtils;

public class CommandeFournisseurValidator {

  public static List<String> validate(CommandeFournisseurRequestDto commandeFournisseurDto) {
    List<String> errors = new ArrayList<>();
    if (commandeFournisseurDto == null) {
      errors.add("Veuillez renseigner le code de la commande");
      errors.add("Veuillez renseigner la date de la commande");
      errors.add("Veuillez renseigner l'etat de la commande");
      errors.add("Veuillez renseigner le fournisseur");
      return errors;
    }

    if (!StringUtils.hasLength(commandeFournisseurDto.getCode())) {
      errors.add("Veuillez renseigner le code de la commande");
    }
    if (commandeFournisseurDto.getDateCommande() == null) {
      errors.add("Veuillez renseigner la date de la commande");
    }
    if (commandeFournisseurDto.getEtatCommande() == null) {
      errors.add("Veuillez renseigner l'etat de la commande");
    }
    if (commandeFournisseurDto.getFournisseurId() == null) {
      errors.add("Veuillez renseigner le fournisseur");
    }

    // Valider les lignes de commande si elles existent
    if (commandeFournisseurDto.getLigneCommandeFournisseurs() != null) {
      for (int i = 0; i < commandeFournisseurDto.getLigneCommandeFournisseurs().size(); i++) {
        var ligneCmdFrs = commandeFournisseurDto.getLigneCommandeFournisseurs().get(i);
        if (ligneCmdFrs.getIdArticle() == null) {
          errors.add("L'article de la ligne " + (i + 1) + " est obligatoire");
        }
        if (ligneCmdFrs.getQuantite() == null || ligneCmdFrs.getQuantite().compareTo(BigDecimal.ZERO) <= 0) {
          errors.add("La quantité de la ligne " + (i + 1) + " doit être positive");
        }
        if (ligneCmdFrs.getPrixUnitaire() == null || ligneCmdFrs.getPrixUnitaire().compareTo(BigDecimal.ZERO) < 0) {
          errors.add("Le prix unitaire de la ligne " + (i + 1) + " ne peut pas être négatif");
        }
      }
    }

    return errors;
  }

  public static List<String> validateEntity(CommandeFournisseur commandeFournisseur) {
    List<String> errors = new ArrayList<>();
    if (commandeFournisseur == null) {
      errors.add("Veuillez renseigner le code de la commande");
      errors.add("Veuillez renseigner la date de la commande");
      errors.add("Veuillez renseigner l'etat de la commande");
      errors.add("Veuillez renseigner le fournisseur");
      return errors;
    }

    if (!StringUtils.hasLength(commandeFournisseur.getCode())) {
      errors.add("Veuillez renseigner le code de la commande");
    }
    if (commandeFournisseur.getDateCommande() == null) {
      errors.add("Veuillez renseigner la date de la commande");
    }
    if (commandeFournisseur.getEtatCommande() == null) {
      errors.add("Veuillez renseigner l'etat de la commande");
    }
    if (commandeFournisseur.getFournisseur() == null || commandeFournisseur.getFournisseur().getId() == null) {
      errors.add("Veuillez renseigner le fournisseur");
    }

    return errors;
  }

}