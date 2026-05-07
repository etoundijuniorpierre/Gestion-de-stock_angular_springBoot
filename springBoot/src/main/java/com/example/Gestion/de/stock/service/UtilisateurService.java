package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.ChangerMotDePasseUtilisateurDto;
import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;

import java.util.List;

public interface UtilisateurService {

  UtilisateurResponseDto save(UtilisateurRequestDto dto);

  UtilisateurResponseDto findById(Integer id);

  List<UtilisateurResponseDto> findAll();

  void delete(Integer id);

  UtilisateurResponseDto findByEmail(String email);

  UtilisateurResponseDto changerMotDePasse(ChangerMotDePasseUtilisateurDto dto);
  
  UtilisateurResponseDto updateUser(Integer id, UtilisateurRequestDto dto);

} 