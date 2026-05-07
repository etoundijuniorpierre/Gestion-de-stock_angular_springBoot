package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.ArticleRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.CategorieResponseDto;
import com.example.Gestion.de.stock.model.entity.Article;

public class ArticleMapper {

    public static Article toEntity(ArticleRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        Article article = new Article();
        article.setCodeArticle(dto.getCodeArticle());
        article.setDesignation(dto.getDesignation());
        article.setPrixUnitaireHt(dto.getPrixUnitaireHt());
        article.setTauxTva(dto.getTauxTva());
        article.setPrixUnitaireTtc(dto.getPrixUnitaireTtc());
        article.setPhoto(dto.getPhoto());
        article.setIdEntreprise(dto.getIdEntreprise());
        
        // Map category from DTO to entity
        if (dto.getCategorie() != null) {
            article.setCategorie(CategorieMapper.toEntity(dto.getCategorie()));
        }
        
        return article;
    }

    public static ArticleResponseDto fromEntity(Article article) {
        if (article == null) {
            return null;
        }
        
        ArticleResponseDto.ArticleResponseDtoBuilder builder = ArticleResponseDto.builder()
                .id(article.getId())
                .codeArticle(article.getCodeArticle())
                .designation(article.getDesignation())
                .prixUnitaireHt(article.getPrixUnitaireHt())
                .tauxTva(article.getTauxTva())
                .prixUnitaireTtc(article.getPrixUnitaireTtc())
                .photo(article.getPhoto())
                .idEntreprise(article.getIdEntreprise());
        
        // Set category if it exists
        if (article.getCategorie() != null) {
            builder.categorie(CategorieMapper.fromEntity(article.getCategorie()));
        }
        
        return builder.build();
    }

    public static ArticleRequestDto toRequestDto(Article article) {
        if (article == null) {
            return null;
        }
        
        ArticleRequestDto.ArticleRequestDtoBuilder builder = ArticleRequestDto.builder()
                .codeArticle(article.getCodeArticle())
                .designation(article.getDesignation())
                .prixUnitaireHt(article.getPrixUnitaireHt())
                .tauxTva(article.getTauxTva())
                .prixUnitaireTtc(article.getPrixUnitaireTtc())
                .photo(article.getPhoto())
                .idEntreprise(article.getIdEntreprise());
        
        // Set category if it exists
        if (article.getCategorie() != null) {
            builder.categorie(CategorieMapper.toRequestDto(article.getCategorie()));
        }
        
        return builder.build();
    }}