package com.example.Gestion.de.stock.service;

import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;

import java.util.List;

public interface FournisseurService {

  FournisseurResponseDto save(FournisseurRequestDto dto);

  FournisseurResponseDto findById(Integer id);

  List<FournisseurResponseDto> findAll();

  void delete(Integer id);

  FournisseurResponseDto update(Integer id, FournisseurRequestDto dto);
}