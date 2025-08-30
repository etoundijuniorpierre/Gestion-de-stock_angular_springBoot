package com.example.Gestion.de.stock.repository;


import java.util.List;

import com.example.Gestion.de.stock.model.entity.LigneVente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneVenteRepository extends JpaRepository<LigneVente, Integer> {

  List<LigneVente> findAllByArticleId(Integer idArticle);

  List<LigneVente> findAllByVenteId(Integer id);
}
