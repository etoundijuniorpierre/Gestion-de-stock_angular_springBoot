package com.example.Gestion.de.stock.controler;

import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.ArticleControllerApi;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneVenteResponseDto;
import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT + "/articles")
public class ArticleController implements ArticleControllerApi {

  private final ArticleService articleService;

  @Autowired
  public ArticleController(
      ArticleService articleService
  ) {
    this.articleService = articleService;
  }

  @Override
  public ArticleResponseDto save(ArticleRequestDto dto) {
    return articleService.save(dto);
  }

  @Override
  public ArticleResponseDto findById(Integer id) {
    return articleService.findById(id);
  }

  @Override
  public ArticleResponseDto findArticleByCodeArticle(String codeArticle) {
    return articleService.findArticleByCodeArticle(codeArticle);
  }

  @Override
  public List<ArticleResponseDto> findAll() {
    return articleService.findAll();
  }

  @Override
  public List<LigneVenteResponseDto> findHistoriqueVentes(Integer idArticle) {
    return articleService.findHistoriqueVentes(idArticle);
  }

  @Override
  public List<LigneCommandeClientResponseDto> findHistoriqueCommandeClient(Integer idArticle) {
    return articleService.findHistoriqueCommandeClient(idArticle);
  }

  @Override
  public List<LigneCommandeFournisseurResponseDto> findHistoriqueCommandeFournisseur(Integer idArticle) {
    return articleService.findHistoriqueCommandeFournisseur(idArticle);
  }

  @Override
  public List<ArticleResponseDto> findAllArticleByIdCategorie(Integer idCategory) {
    return articleService.findAllArticleByIdCategorie(idCategory);
  }

  @Override
  public void delete(Integer id) {
    articleService.deleteById(id);
  }

  @Override
  public ResponseEntity<ArticleResponseDto> updateArticle(Integer id, ArticleRequestDto dto) {
    return ResponseEntity.ok(articleService.update(id, dto));
  }
}