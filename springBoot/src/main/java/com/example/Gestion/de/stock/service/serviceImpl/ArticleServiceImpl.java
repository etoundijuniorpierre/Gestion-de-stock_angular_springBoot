package com.example.Gestion.de.stock.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.mapper.ArticleMapper;
import com.example.Gestion.de.stock.dto.mapper.CategorieMapper;
import com.example.Gestion.de.stock.dto.mapper.CommandeClientMapper;
import com.example.Gestion.de.stock.dto.mapper.CommandeFournisseurMapper;
import com.example.Gestion.de.stock.dto.mapper.LigneCommandeClientMapper;
import com.example.Gestion.de.stock.dto.mapper.LigneCommandeFournisseurMapper;
import com.example.Gestion.de.stock.dto.mapper.LigneVenteMapper;
import com.example.Gestion.de.stock.dto.mapper.VentesMapper;
import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.CategorieResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneVenteResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.*;
import com.example.Gestion.de.stock.repository.*;
import com.example.Gestion.de.stock.service.ArticleService;
import com.example.Gestion.de.stock.validator.ArticleValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
public class ArticleServiceImpl implements ArticleService {

  private final ArticleRepository articleRepository;
  private final LigneVenteRepository venteRepository;
  private final LigneCdeFournisseurRepository commandeFournisseurRepository;
  private final LigneCdeCltRepository ligneCdeCltRepository;
  private final CategorieRepository categorieRepository;

  @Autowired
  public ArticleServiceImpl(
          ArticleRepository articleRepository,
          LigneVenteRepository venteRepository, LigneCdeFournisseurRepository commandeFournisseurRepository,
          LigneCdeCltRepository ligneCdeCltRepository, CategorieRepository categorieRepository) {
    this.articleRepository = articleRepository;
    this.venteRepository = venteRepository;
    this.commandeFournisseurRepository = commandeFournisseurRepository;
    this.ligneCdeCltRepository = ligneCdeCltRepository;
      this.categorieRepository = categorieRepository;
  }

  @Override
  public ArticleResponseDto save(ArticleRequestDto dto) {
    // Convert request DTO to entity for validation
    Article article = ArticleMapper.toEntity(dto);
    List<String> errors = ArticleValidator.validateEntity(article);
    if (!errors.isEmpty()) {
        log.error("Article is not valid {}", article);
        throw new InvalidEntityException(
                "L'article n'est pas valide",
                ErrorCodes.ARTICLE_NOT_VALID,
                errors
        );
    }

    if (dto.getCategorie() == null || dto.getCategorie().getCode() == null) {
        throw new InvalidEntityException(
                "Impossible d'enregistrer un article sans catégorie",
                ErrorCodes.ARTICLE_NOT_VALID
        );
    }

    Categorie categorie = categorieRepository.findCategorieByCode(dto.getCategorie().getCode())
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune catégorie trouvée avec CODE = " + dto.getCategorie().getCode(),
                    ErrorCodes.CATEGORIE_NOT_FOUND
            ));

    article.setCategorie(categorie);
    Article savedArticle = articleRepository.save(article);

    // Create response DTO with full category information
    return ArticleMapper.fromEntity(savedArticle);
  }

  @Override
  public ArticleResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Article ID is null");
      return null;
    }

    Article article = articleRepository.findById(id)
        .orElseThrow(() ->
            new EntityNotFoundException(
                "Aucun article avec l'ID = " + id + " n' ete trouve dans la BDD",
                ErrorCodes.ARTICLE_NOT_FOUND)
        );
    
    // Create response DTO with full category information
    return ArticleMapper.fromEntity(article);
  }

  @Override
  public ArticleResponseDto findArticleByCodeArticle(String codeArticle) {
    if (!StringUtils.hasLength(codeArticle)) {
      log.error("Article CODE is null");
      return null;
    }

    Article article = articleRepository.findArticleByCodeArticle(codeArticle)
        .orElseThrow(() ->
            new EntityNotFoundException(
                "Aucun article avec le CODE = " + codeArticle + " n' ete trouve dans la BDD",
                ErrorCodes.ARTICLE_NOT_FOUND)
        );
    
    // Create response DTO with full category information
    return ArticleMapper.fromEntity(article);
  }

  @Override
  public List<ArticleResponseDto> findAll() {
    return articleRepository.findAll().stream()
        .map(ArticleMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public List<LigneVenteResponseDto> findHistoriqueVentes(Integer idArticle) {
    return venteRepository.findAllByArticleId(idArticle).stream()
        .map(LigneVenteMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public List<LigneCommandeClientResponseDto> findHistoriqueCommandeClient(Integer idArticle) {
    return ligneCdeCltRepository.findAllByArticleId(idArticle).stream()
        .map(LigneCommandeClientMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public List<LigneCommandeFournisseurResponseDto> findHistoriqueCommandeFournisseur(Integer idArticle) {
    return commandeFournisseurRepository.findAllByArticleId(idArticle).stream()
        .map(LigneCommandeFournisseurMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public List<ArticleResponseDto> findAllArticleByIdCategorie(Integer idCategorie) {
    return articleRepository.findAllByCategorieId(idCategorie).stream()
        .map(ArticleMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void deleteById(Integer id) {
    if (id == null) {
      log.error("Article ID is null");
      return;
    }
    List<LigneCommandeClient> ligneCommandeClients = ligneCdeCltRepository.findAllByArticleId(id);
    if (!ligneCommandeClients.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer un article deja utilise dans des commandes client", ErrorCodes.ARTICLE_ALREADY_IN_USE);
    }
    List<LigneCommandeFournisseur> ligneCommandeFournisseurs = commandeFournisseurRepository.findAllByArticleId(id);
    if (!ligneCommandeFournisseurs.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer un article deja utilise dans des commandes fournisseur",
          ErrorCodes.ARTICLE_ALREADY_IN_USE);
    }
    List<LigneVente> ligneVentes = venteRepository.findAllByArticleId(id);
    if (!ligneVentes.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer un article deja utilise dans des ventes",
          ErrorCodes.ARTICLE_ALREADY_IN_USE);
    }
    articleRepository.deleteById(id);
  }

  @Override
  public ArticleResponseDto update(Integer id, ArticleRequestDto dto) {
    if (id == null) {
        throw new InvalidEntityException(
                "Impossible de mettre à jour un article sans ID",
                ErrorCodes.ARTICLE_NOT_VALID
        );
    }

    Article existingArticle = articleRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucun article trouvé avec l'ID = " + id,
                    ErrorCodes.ARTICLE_NOT_FOUND
            ));

    // Convert request DTO to entity for validation
    Article articleToUpdate = ArticleMapper.toEntity(dto);
    articleToUpdate.setId(id); // Set the ID for validation
    List<String> errors = ArticleValidator.validateEntity(articleToUpdate);
    if (!errors.isEmpty()) {
        log.error("Article is not valid {}", articleToUpdate);
        throw new InvalidEntityException(
                "L'article n'est pas valide",
                ErrorCodes.ARTICLE_NOT_VALID,
                errors
        );
    }

    if (dto.getCategorie() == null || dto.getCategorie().getCode() == null) {
        throw new InvalidEntityException(
                "Impossible de mettre à jour un article sans catégorie",
                ErrorCodes.ARTICLE_NOT_VALID
        );
    }

    Categorie categorie = categorieRepository.findCategorieByCode(dto.getCategorie().getCode())
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune catégorie trouvée avec CODE = " + dto.getCategorie().getCode(),
                    ErrorCodes.CATEGORIE_NOT_FOUND
            ));

    // Update the existing article with data from the request DTO
    existingArticle.setCodeArticle(dto.getCodeArticle());
    existingArticle.setDesignation(dto.getDesignation());
    existingArticle.setPrixUnitaireHt(dto.getPrixUnitaireHt());
    existingArticle.setTauxTva(dto.getTauxTva());
    existingArticle.setPrixUnitaireTtc(dto.getPrixUnitaireTtc());
    existingArticle.setPhoto(dto.getPhoto());
    existingArticle.setIdEntreprise(dto.getIdEntreprise());
    existingArticle.setCategorie(categorie);
    Article updatedArticle = articleRepository.save(existingArticle);

    // Create response DTO with full category information
    return ArticleMapper.fromEntity(updatedArticle);
  }
}