package com.example.Gestion.de.stock.repository;


import java.util.Optional;

import com.example.Gestion.de.stock.model.entity.Ventes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentesRepository extends JpaRepository<Ventes, Integer> {

  Optional<Ventes> findVentesByCode(String code);
}
