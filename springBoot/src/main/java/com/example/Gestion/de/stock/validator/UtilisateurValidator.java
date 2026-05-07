package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.model.entity.Utilisateur;
import org.springframework.util.StringUtils;

public class UtilisateurValidator {

  public static List<String> validate(UtilisateurRequestDto utilisateurRequestDto) {
    List<String> errors = new ArrayList<>();

    if (utilisateurRequestDto == null) {
      errors.add("Veuillez renseigner le nom d'utilisateur");
      errors.add("Veuillez renseigner le prenom d'utilisateur");
      errors.add("Veuillez renseigner le mot de passe d'utilisateur");
      errors.add("Veuillez renseigner l'adresse d'utilisateur");
      errors.addAll(AdresseValidator.validate(null));
      return errors;
    }

    if (!StringUtils.hasLength(utilisateurRequestDto.getNom())) {
      errors.add("Veuillez renseigner le nom d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateurRequestDto.getPrenom())) {
      errors.add("Veuillez renseigner le prenom d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateurRequestDto.getEmail())) {
      errors.add("Veuillez renseigner l'email d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateurRequestDto.getMotDePasse())) {
      errors.add("Veuillez renseigner le mot de passe d'utilisateur");
    }
    if (utilisateurRequestDto.getDateDeNaissance() == null) {
      errors.add("Veuillez renseigner la date de naissance d'utilisateur");
    }
    errors.addAll(AdresseValidator.validate(utilisateurRequestDto.getAdresse()));

    return errors;
  }

  public static List<String> validateEntity(Utilisateur utilisateur) {
    List<String> errors = new ArrayList<>();

    if (utilisateur == null) {
      errors.add("Veuillez renseigner le nom d'utilisateur");
      errors.add("Veuillez renseigner le prenom d'utilisateur");
      errors.add("Veuillez renseigner le mot de passe d'utilisateur");
      errors.add("Veuillez renseigner l'adresse d'utilisateur");
      errors.addAll(AdresseValidator.validateEntity(null));
      return errors;
    }

    if (!StringUtils.hasLength(utilisateur.getNom())) {
      errors.add("Veuillez renseigner le nom d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateur.getPrenom())) {
      errors.add("Veuillez renseigner le prenom d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateur.getEmail())) {
      errors.add("Veuillez renseigner l'email d'utilisateur");
    }
    if (!StringUtils.hasLength(utilisateur.getMotDePasse())) {
      errors.add("Veuillez renseigner le mot de passe d'utilisateur");
    }
    if (utilisateur.getDateDeNaissance() == null) {
      errors.add("Veuillez renseigner la date de naissance d'utilisateur");
    }
    errors.addAll(AdresseValidator.validateEntity(utilisateur.getAdresse()));

    return errors;
  }

}