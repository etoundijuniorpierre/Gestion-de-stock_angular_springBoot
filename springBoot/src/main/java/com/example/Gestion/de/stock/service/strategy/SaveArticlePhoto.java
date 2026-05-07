package com.example.Gestion.de.stock.service.strategy;

import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.ArticleService;
import com.example.Gestion.de.stock.service.PhotoStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.io.InputStream;
import lombok.extern.slf4j.Slf4j;

@Service("articleStrategy")
@Slf4j
public class SaveArticlePhoto implements Strategy<ArticleRequestDto> {

  private final PhotoStorageService photoStorageService;
  private final ArticleService articleService;

  @Autowired
  public SaveArticlePhoto(PhotoStorageService photoStorageService, ArticleService articleService) {
    this.photoStorageService = photoStorageService;
    this.articleService = articleService;
  }

  @Override
  public ArticleRequestDto savePhoto(Integer id, InputStream photo, String titre) {
    ArticleResponseDto articleResponse = articleService.findById(id);
    if (articleResponse == null) {
      throw new InvalidOperationException("Article non trouvé avec l'ID : " + id, ErrorCodes.ARTICLE_NOT_FOUND);
    }

    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo de l'article", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    
    // Convert response DTO to request DTO for updating
    ArticleRequestDto articleRequest = convertToRequestDto(articleResponse);
    articleRequest.setPhoto(urlPhoto);
    articleService.update(id, articleRequest);
    return articleRequest;
  }
  
  private ArticleRequestDto convertToRequestDto(ArticleResponseDto responseDto) {
    if (responseDto == null) {
      return null;
    }
    
    return ArticleRequestDto.builder()
        .codeArticle(responseDto.getCodeArticle())
        .designation(responseDto.getDesignation())
        .prixUnitaireHt(responseDto.getPrixUnitaireHt())
        .tauxTva(responseDto.getTauxTva())
        .prixUnitaireTtc(responseDto.getPrixUnitaireTtc())
        .photo(responseDto.getPhoto())
        .idEntreprise(responseDto.getIdEntreprise())
        .build();
  }
}