package com.example.Gestion.de.stock.repository;


import java.util.Optional;

import com.example.Gestion.de.stock.model.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {

  Optional<Categorie> findCategorieByCode(String code);

}
