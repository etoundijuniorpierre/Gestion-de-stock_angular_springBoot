package com.example.Gestion.de.stock.repository;


import com.example.Gestion.de.stock.model.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {

}
