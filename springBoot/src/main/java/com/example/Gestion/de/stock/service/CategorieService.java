package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.CategorieRequestDto;
import com.example.Gestion.de.stock.dto.response.CategorieResponseDto;

import java.util.List;

public interface CategorieService {

  CategorieResponseDto save(CategorieRequestDto dto);

  CategorieResponseDto findById(Integer id);

  CategorieResponseDto findCategorieByCode(String code);

  List<CategorieResponseDto> findAll();

  void delete(Integer id);

}