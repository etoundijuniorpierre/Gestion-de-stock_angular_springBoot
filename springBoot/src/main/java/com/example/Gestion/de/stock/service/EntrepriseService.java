package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import com.example.Gestion.de.stock.dto.response.EntrepriseResponseDto;

import java.util.List;

public interface EntrepriseService {

  EntrepriseResponseDto save(EntrepriseRequestDto dto);

  EntrepriseResponseDto findById(Integer id);

  List<EntrepriseResponseDto> findAll();

  void delete(Integer id);

}