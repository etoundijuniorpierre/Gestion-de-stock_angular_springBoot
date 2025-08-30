package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.ArticleDto;
import com.example.Gestion.de.stock.dto.LigneCommandeClientDto;
import com.example.Gestion.de.stock.dto.LigneCommandeFournisseurDto;
import com.example.Gestion.de.stock.dto.LigneVenteDto;

import java.util.List;

public interface ArticleService {

  ArticleDto save(ArticleDto dto);

  ArticleDto findById(Integer id);

  ArticleDto findArticleByCodeArticle(String codeArticle);

  List<ArticleDto> findAll();

  List<LigneVenteDto> findHistoriqueVentes(Integer idArticle);

  List<LigneCommandeClientDto> findHistoriqueCommandeClient(Integer idArticle);

  List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle);

  List<ArticleDto> findAllArticleByIdCategorie(Integer idCategorie);

  void deleteById(Integer id);

}
