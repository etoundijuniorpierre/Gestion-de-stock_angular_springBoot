package com.example.Gestion.de.stock.repository;


import com.example.Gestion.de.stock.model.entity.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Integer> {

}
