package com.example.Gestion.de.stock.service;

import com.example.Gestion.de.stock.dto.FournisseurDto;

import java.util.List;

public interface FournisseurService {

  FournisseurDto save(FournisseurDto dto);

  FournisseurDto findById(Integer id);

  List<FournisseurDto> findAll();

  void delete(Integer id);

}
