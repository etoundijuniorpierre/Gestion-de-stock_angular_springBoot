package com.example.Gestion.de.stock.controler;

import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.UtilisateurApi;
import com.example.Gestion.de.stock.dto.request.ChangerMotDePasseUtilisateurDto;
import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
import com.example.Gestion.de.stock.service.UtilisateurService;
import com.example.Gestion.de.stock.service.UnsplashApiService; // <--- NEW IMPORT for the dedicated Unsplash API service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilisateurController implements UtilisateurApi {

  private final UtilisateurService utilisateurService;
  private final UnsplashApiService unsplashApiService; // <--- DEPENDENCY CHANGED to the API service

  @Autowired
  public UtilisateurController(UtilisateurService utilisateurService, UnsplashApiService unsplashApiService) { // <--- CONSTRUCTOR CHANGED
    this.utilisateurService = utilisateurService;
    this.unsplashApiService = unsplashApiService; // <--- ASSIGN NEW SERVICE
  }

  @Override
  public UtilisateurResponseDto save(UtilisateurRequestDto dto) {
    if (dto.getPhoto() == null || dto.getPhoto().isEmpty()) {
      // Use the dedicated Unsplash API service for fetching
      String randomPhotoUrl = unsplashApiService.getRandomPhotoUrl("profile"); // <--- METHOD CALL CHANGED
      dto.setPhoto(randomPhotoUrl);
    }
    return utilisateurService.save(dto);
  }

  @Override
  public UtilisateurResponseDto updateUser(Integer id, UtilisateurRequestDto dto) {
    return utilisateurService.updateUser(id, dto);
  }

  @Override
  public UtilisateurResponseDto changerMotDePasse(ChangerMotDePasseUtilisateurDto dto) {
    return utilisateurService.changerMotDePasse(dto);
  }

  @Override
  public UtilisateurResponseDto findById(Integer id) {
    return utilisateurService.findById(id);
  }

  @Override
  public UtilisateurResponseDto findByEmail(String email) {
    return utilisateurService.findByEmail(email);
  }

  @Override
  public List<UtilisateurResponseDto> findAll() {
    return utilisateurService.findAll();
  }

  @Override
  public void delete(Integer id) {
    utilisateurService.delete(id);
  }
}