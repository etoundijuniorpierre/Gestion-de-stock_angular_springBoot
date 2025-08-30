package com.example.Gestion.de.stock.controler;


import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.ArticleControllerApi;
import com.example.Gestion.de.stock.dto.ArticleDto;
import com.example.Gestion.de.stock.dto.LigneCommandeClientDto;
import com.example.Gestion.de.stock.dto.LigneCommandeFournisseurDto;
import com.example.Gestion.de.stock.dto.LigneVenteDto;
import com.example.Gestion.de.stock.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
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
  public ArticleDto save(ArticleDto dto) {

    return articleService.save(dto);
  }

  @Override
  public ArticleDto findById(Integer id) {

    return articleService.findById(id);
  }

  @Override
  public ArticleDto findArticleByCodeArticle(String codeArticle) {
    return articleService.findArticleByCodeArticle(codeArticle);
  }

  @Override
  public List<ArticleDto> findAll() {

    return articleService.findAll();
  }

  @Override
  public List<LigneVenteDto> findHistoriqueVentes(Integer idArticle) {
    return articleService.findHistoriqueVentes(idArticle);
  }

  @Override
  public List<LigneCommandeClientDto> findHistoriqueCommandeClient(Integer idArticle) {
    return articleService.findHistoriqueCommandeClient(idArticle);
  }

  @Override
  public List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle) {
    return articleService.findHistoriqueCommandeFournisseur(idArticle);
  }

  @Override
  public List<ArticleDto> findAllArticleByIdCategorie(Integer idCategory) {
    return articleService.findAllArticleByIdCategorie(idCategory);
  }

  @Override
  public void delete(Integer id) {
    articleService.deleteById(id);
  }


}
