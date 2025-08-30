package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.CategorieDto;

import java.util.List;

public interface CategorieService {

  CategorieDto save(CategorieDto dto);

  CategorieDto findById(Integer id);

  CategorieDto findCategorieByCode(String code);

  List<CategorieDto> findAll();

  void delete(Integer id);

}
