package com.example.Gestion.de.stock.service.serviceImpl;

import com.example.Gestion.de.stock.dto.mapper.MvtStkMapper;
import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.model.entity.Article;
import com.example.Gestion.de.stock.model.entity.MvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import com.example.Gestion.de.stock.repository.ArticleRepository;
import com.example.Gestion.de.stock.repository.MvtStkRepository;
import com.example.Gestion.de.stock.service.ArticleService;
import com.example.Gestion.de.stock.service.MvtStkService;
import com.example.Gestion.de.stock.validator.MvtStkValidator;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MvtStkServiceImpl implements MvtStkService {

  private MvtStkRepository repository;
  private ArticleService articleService;
  private ArticleRepository articleRepository;

  @Autowired
  public MvtStkServiceImpl(MvtStkRepository repository, ArticleService articleService, ArticleRepository articleRepository) {
    this.repository = repository;
    this.articleService = articleService;
    this.articleRepository = articleRepository;
  }

  @Override
  public BigDecimal stockReelArticle(Integer idArticle) {
    if (idArticle == null) {
      log.warn("ID article is NULL");
      return BigDecimal.valueOf(-1);
    }
    articleService.findById(idArticle);
    return repository.stockReelArticle(idArticle);
  }

  @Override
  public List<MvtStkResponseDto> mvtStkArticle(Integer idArticle) {
    return repository.findAllByArticleId(idArticle).stream()
        .map(MvtStkMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public MvtStkResponseDto entreeStock(MvtStkRequestDto dto) {
    return entreePositive(dto, TypeMvtStk.ENTREE);
  }

  @Override
  public MvtStkResponseDto sortieStock(MvtStkRequestDto dto) {
    return sortieNegative(dto, TypeMvtStk.SORTIE);
  }

  @Override
  public MvtStkResponseDto correctionStockPos(MvtStkRequestDto dto) {
    return entreePositive(dto, TypeMvtStk.CORRECTION_POS);
  }

  @Override
  public MvtStkResponseDto correctionStockNeg(MvtStkRequestDto dto) {
    return sortieNegative(dto, TypeMvtStk.CORRECTION_NEG);
  }

  private MvtStkResponseDto entreePositive(MvtStkRequestDto dto, TypeMvtStk typeMvtStk) {
    List<String> errors = MvtStkValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Article is not valid {}", dto);
      throw new InvalidEntityException("Le mouvement du stock n'est pas valide", ErrorCodes.MVT_STK_NOT_VALID, errors);
    }
    
    // Validate that idArticle is provided
    if (dto.getIdArticle() == null) {
      log.error("ID Article is NULL");
      throw new InvalidEntityException("L'ID de l'article est obligatoire", ErrorCodes.MVT_STK_NOT_VALID, errors);
    }
    
    // Fetch the existing article from database
    Article article = articleRepository.findById(dto.getIdArticle())
        .orElseThrow(() -> new EntityNotFoundException("Article introuvable", ErrorCodes.ARTICLE_NOT_FOUND));
    
    dto.setQuantite(
        BigDecimal.valueOf(
            Math.abs(dto.getQuantite().doubleValue())
        )
    );
    dto.setTypeMvt(typeMvtStk);
    
    // Create MvtStk entity with the fetched article
    MvtStk mvtStk = MvtStkMapper.toEntity(dto);
    mvtStk.setArticle(article); // Set the managed article entity
    
    return MvtStkMapper.fromEntity(
        repository.save(mvtStk)
    );
  }

  private MvtStkResponseDto sortieNegative(MvtStkRequestDto dto, TypeMvtStk typeMvtStk) {
    List<String> errors = MvtStkValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Article is not valid {}", dto);
      throw new InvalidEntityException("Le mouvement du stock n'est pas valide", ErrorCodes.MVT_STK_NOT_VALID, errors);
    }
    
    // Validate that idArticle is provided
    if (dto.getIdArticle() == null) {
      log.error("ID Article is NULL");
      throw new InvalidEntityException("L'ID de l'article est obligatoire", ErrorCodes.MVT_STK_NOT_VALID, errors);
    }
    
    // Fetch the existing article from database
    Article article = articleRepository.findById(dto.getIdArticle())
        .orElseThrow(() -> new EntityNotFoundException("Article introuvable", ErrorCodes.ARTICLE_NOT_FOUND));
    
    dto.setQuantite(
        BigDecimal.valueOf(
            Math.abs(dto.getQuantite().doubleValue()) * -1
        )
    );
    dto.setTypeMvt(typeMvtStk);
    
    // Create MvtStk entity with the fetched article
    MvtStk mvtStk = MvtStkMapper.toEntity(dto);
    mvtStk.setArticle(article); // Set the managed article entity
    
    return MvtStkMapper.fromEntity(
        repository.save(mvtStk)
    );
  }
}