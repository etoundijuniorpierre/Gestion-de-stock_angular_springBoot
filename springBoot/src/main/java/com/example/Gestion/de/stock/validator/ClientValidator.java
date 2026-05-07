package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.ClientRequestDto;
import com.example.Gestion.de.stock.model.entity.Client;
import com.example.Gestion.de.stock.validator.AdresseValidator;
import org.springframework.util.StringUtils;

public class ClientValidator {

  public static List<String> validate(ClientRequestDto clientRequestDto) {
    List<String> errors = new ArrayList<>();

    if (clientRequestDto == null) {
      errors.add("Veuillez renseigner le nom du client");
      errors.add("Veuillez renseigner le prenom du client");
      errors.add("Veuillez renseigner le Mail du client");
      errors.add("Veuillez renseigner le numero de telephone du client");
      errors.addAll(AdresseValidator.validate(null));
      return errors;
    }

    if (!StringUtils.hasLength(clientRequestDto.getNom())) {
      errors.add("Veuillez renseigner le nom du client");
    }
    if (!StringUtils.hasLength(clientRequestDto.getPrenom())) {
      errors.add("Veuillez renseigner le prenom du client");
    }
    if (!StringUtils.hasLength(clientRequestDto.getMail())) {
      errors.add("Veuillez renseigner le Mail du client");
    }
    if (!StringUtils.hasLength(clientRequestDto.getNumTel())) {
      errors.add("Veuillez renseigner le numero de telephone du client");
    }
    errors.addAll(AdresseValidator.validate(clientRequestDto.getAdresse()));
    return errors;
  }

  public static List<String> validateEntity(Client client) {
    List<String> errors = new ArrayList<>();

    if (client == null) {
      errors.add("Veuillez renseigner le nom du client");
      errors.add("Veuillez renseigner le prenom du client");
      errors.add("Veuillez renseigner le Mail du client");
      errors.add("Veuillez renseigner le numero de telephone du client");
      errors.addAll(AdresseValidator.validateEntity(null));
      return errors;
    }

    if (!StringUtils.hasLength(client.getNom())) {
      errors.add("Veuillez renseigner le nom du client");
    }
    if (!StringUtils.hasLength(client.getPrenom())) {
      errors.add("Veuillez renseigner le prenom du client");
    }
    if (!StringUtils.hasLength(client.getMail())) {
      errors.add("Veuillez renseigner le Mail du client");
    }
    if (!StringUtils.hasLength(client.getNumTel())) {
      errors.add("Veuillez renseigner le numero de telephone du client");
    }
    errors.addAll(AdresseValidator.validateEntity(client.getAdresse()));
    return errors;
  }

}