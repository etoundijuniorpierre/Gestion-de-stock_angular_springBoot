package com.example.Gestion.de.stock.validator;

import java.util.ArrayList;
import java.util.List;

import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.model.entity.Article;
import org.springframework.util.StringUtils;

public class ArticleValidator {

  public static List<String> validate(ArticleRequestDto articleDto) {
    List<String> errors = new ArrayList<>();

    if (articleDto == null) {
      errors.add("Veuillez renseigner le code de l'article");
      errors.add("Veuillez renseigner la designation de l'article");
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
      errors.add("Veuillez renseigner le taux TVA de l'article");
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
      errors.add("Veuillez selectionner une categorie");
      return errors;
    }

    if (!StringUtils.hasLength(articleDto.getCodeArticle())) {
      errors.add("Veuillez renseigner le code de l'article");
    }
    if (!StringUtils.hasLength(articleDto.getDesignation())) {
      errors.add("Veuillez renseigner la designation de l'article");
    }
    if (articleDto.getPrixUnitaireHt() == null) {
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
    }
    if (articleDto.getTauxTva() == null) {
      errors.add("Veuillez renseigner le taux TVA de l'article");
    }
    if (articleDto.getPrixUnitaireTtc() == null) {
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
    }
    if (articleDto.getCategorie() == null) {
      errors.add("Veuillez selectionner une categorie");
    }
    return errors;
  }

  public static List<String> validate(ArticleResponseDto articleDto) {
    List<String> errors = new ArrayList<>();

    if (articleDto == null) {
      errors.add("Veuillez renseigner le code de l'article");
      errors.add("Veuillez renseigner la designation de l'article");
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
      errors.add("Veuillez renseigner le taux TVA de l'article");
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
      errors.add("Veuillez selectionner une categorie");
      return errors;
    }

    if (!StringUtils.hasLength(articleDto.getCodeArticle())) {
      errors.add("Veuillez renseigner le code de l'article");
    }
    if (!StringUtils.hasLength(articleDto.getDesignation())) {
      errors.add("Veuillez renseigner la designation de l'article");
    }
    if (articleDto.getPrixUnitaireHt() == null) {
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
    }
    if (articleDto.getTauxTva() == null) {
      errors.add("Veuillez renseigner le taux TVA de l'article");
    }
    if (articleDto.getPrixUnitaireTtc() == null) {
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
    }
    if (articleDto.getCategorie() == null) {
      errors.add("Veuillez selectionner une categorie");
    }
    return errors;
  }

  public static List<String> validateEntity(Article article) {
    List<String> errors = new ArrayList<>();

    if (article == null) {
      errors.add("Veuillez renseigner le code de l'article");
      errors.add("Veuillez renseigner la designation de l'article");
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
      errors.add("Veuillez renseigner le taux TVA de l'article");
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
      errors.add("Veuillez selectionner une categorie");
      return errors;
    }

    if (!StringUtils.hasLength(article.getCodeArticle())) {
      errors.add("Veuillez renseigner le code de l'article");
    }
    if (!StringUtils.hasLength(article.getDesignation())) {
      errors.add("Veuillez renseigner la designation de l'article");
    }
    if (article.getPrixUnitaireHt() == null) {
      errors.add("Veuillez renseigner le prix unitaire HT l'article");
    }
    if (article.getTauxTva() == null) {
      errors.add("Veuillez renseigner le taux TVA de l'article");
    }
    if (article.getPrixUnitaireTtc() == null) {
      errors.add("Veuillez renseigner le prix unitaire TTC de l'article");
    }
    if (article.getCategorie() == null) {
      errors.add("Veuillez selectionner une categorie");
    }
    return errors;
  }

}