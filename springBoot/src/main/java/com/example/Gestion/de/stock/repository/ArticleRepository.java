package com.example.Gestion.de.stock.repository;


import java.util.List;
import java.util.Optional;

import com.example.Gestion.de.stock.model.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

  List<Article> findAllByCategorieId(Integer idCategorie);

  Optional<Article> findArticleByCodeArticle(String codeArticle);
}
