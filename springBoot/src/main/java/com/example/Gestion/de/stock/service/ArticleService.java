package com.example.Gestion.de.stock.service;

import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeFournisseurResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneVenteResponseDto;
import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import java.util.List;

public interface ArticleService {

  ArticleResponseDto save(ArticleRequestDto dto);

  ArticleResponseDto findById(Integer id);

  ArticleResponseDto findArticleByCodeArticle(String codeArticle);

  List<ArticleResponseDto> findAll();

  List<LigneVenteResponseDto> findHistoriqueVentes(Integer idArticle);

  List<LigneCommandeClientResponseDto> findHistoriqueCommandeClient(Integer idArticle);

  List<LigneCommandeFournisseurResponseDto> findHistoriqueCommandeFournisseur(Integer idArticle);

  List<ArticleResponseDto> findAllArticleByIdCategorie(Integer idCategorie);

  void deleteById(Integer id);

  ArticleResponseDto update(Integer id, ArticleRequestDto dto);
}