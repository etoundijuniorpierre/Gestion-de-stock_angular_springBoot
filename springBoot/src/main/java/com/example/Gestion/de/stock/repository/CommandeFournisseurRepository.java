package com.example.Gestion.de.stock.repository;


import java.util.List;
import java.util.Optional;

import com.example.Gestion.de.stock.model.entity.CommandeClient;
import com.example.Gestion.de.stock.model.entity.CommandeFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeFournisseurRepository extends JpaRepository<CommandeFournisseur, Integer> {

  Optional<CommandeFournisseur> findCommandeFournisseurByCode(String code);

  List<CommandeClient> findAllByFournisseurId(Integer id);
}
