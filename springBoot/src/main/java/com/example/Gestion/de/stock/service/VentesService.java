package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;

import java.util.List;

public interface VentesService {

  VentesResponseDto save(VentesRequestDto dto);

  VentesResponseDto findById(Integer id);

  VentesResponseDto findByCode(String code);

  List<VentesResponseDto> findAll();

  void delete(Integer id);

}