package com.example.Gestion.de.stock.service.strategy;// package com.example.Gestion.de.stock.service.serviceImpl; (Adjust package as needed)

import com.example.Gestion.de.stock.dto.ArticleDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.ArticleService;
import com.example.Gestion.de.stock.service.PhotoStorageService; // Import the new interface
import com.example.Gestion.de.stock.service.strategy.Strategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.io.InputStream;
// import com.flickr4java.flickr.FlickrException; // Remove if not used
import lombok.extern.slf4j.Slf4j;

@Service("articleStrategy")
@Slf4j
public class SaveArticlePhoto implements Strategy<ArticleDto> {

  private final PhotoStorageService photoStorageService; // Use the interface
  private final ArticleService articleService;

  @Autowired
  public SaveArticlePhoto(PhotoStorageService photoStorageService, ArticleService articleService) { // Inject the interface
    this.photoStorageService = photoStorageService;
    this.articleService = articleService;
  }

  @Override
  public ArticleDto savePhoto(Integer id, InputStream photo, String titre) { // Removed throws FlickrException
    ArticleDto article = articleService.findById(id);
    if (article == null) {
      throw new InvalidOperationException("Article non trouvé avec l'ID : " + id, ErrorCodes.ARTICLE_NOT_FOUND);
    }

    String urlPhoto = photoStorageService.savePhoto(photo, titre); // Call via the interface
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo de l'article", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    article.setPhoto(urlPhoto);
    return articleService.save(article);
  }
}