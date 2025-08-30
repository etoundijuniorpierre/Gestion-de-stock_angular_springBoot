package com.example.Gestion.de.stock.service.serviceImpl;


import java.util.List;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.CategorieDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.Article;
import com.example.Gestion.de.stock.repository.ArticleRepository;
import com.example.Gestion.de.stock.repository.CategorieRepository;
import com.example.Gestion.de.stock.service.CategorieService;
import com.example.Gestion.de.stock.validator.CategorieValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.example.Gestion.de.stock.exception.ErrorCodes;


@Service
@Slf4j
public class CategorieServiceImpl implements CategorieService {

  private CategorieRepository categorieRepository;
  private ArticleRepository articleRepository;

  @Autowired
  public CategorieServiceImpl(CategorieRepository categorieRepository, ArticleRepository articleRepository) {
    this.categorieRepository = categorieRepository;
    this.articleRepository = articleRepository;
  }

  @Override
  public CategorieDto save(CategorieDto dto) {
    List<String> errors = CategorieValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Article is not valid {}", dto);
      throw new InvalidEntityException("La categorie n'est pas valide", ErrorCodes.CATEGORIE_NOT_VALID, errors);
    }
    return CategorieDto.fromEntity(
        categorieRepository.save(CategorieDto.toEntity(dto))
    );
  }

  @Override
  public CategorieDto findById(Integer id) {
    if (id == null) {
      log.error("Categorie ID is null");
      return null;
    }
    return categorieRepository.findById(id)
            .map(CategorieDto::fromEntity)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune categorie avec l'ID = 0 n' ete trouve dans la BDD",
                    ErrorCodes.CATEGORIE_NOT_VALID
            ));
  }


  public CategorieDto findCategorieByCode(String code) {
    if (!StringUtils.hasLength(code)) {
      log.error("Categorie CODE is null");
      return null;
    }
    return categorieRepository.findCategorieByCode(code)
        .map(CategorieDto::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucune categorie avec le CODE = " + code + " n' ete trouve dans la BDD",
            ErrorCodes.CATEGORIE_NOT_FOUND)
        );
  }

  @Override
  public List<CategorieDto> findAll() {
    return categorieRepository.findAll().stream()
        .map(CategorieDto::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Categorie ID is null");
      return;
    }
    List<Article> articles = articleRepository.findAllByCategorieId(id);
    if (!articles.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer cette categorie qui est deja utilise",
          ErrorCodes.CATEGORIE_ALREADY_IN_USE);
    }
    categorieRepository.deleteById(id);
  }
}
