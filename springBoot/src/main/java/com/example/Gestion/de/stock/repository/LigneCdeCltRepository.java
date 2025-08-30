package com.example.Gestion.de.stock.repository;


import java.util.List;

import com.example.Gestion.de.stock.model.entity.LigneCommandeClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneCdeCltRepository extends JpaRepository<LigneCommandeClient, Integer> {


  List<LigneCommandeClient> findAllByCommandeClientId(Integer id);

  List<LigneCommandeClient> findAllByArticleId(Integer id);
}
