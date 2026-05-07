package com.example.Gestion.de.stock.controler;


import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.FournisseurApi;
import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;
import com.example.Gestion.de.stock.service.FournisseurService;
import com.example.Gestion.de.stock.service.UnsplashApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FournisseurController implements FournisseurApi {

  private final FournisseurService fournisseurService;
  private final UnsplashApiService unsplashApiService;

  @Autowired
  public FournisseurController(FournisseurService fournisseurService,
                               UnsplashApiService unsplashApiService) {
    this.fournisseurService = fournisseurService;
      this.unsplashApiService = unsplashApiService;
  }

  @Override
  public FournisseurResponseDto save(FournisseurRequestDto dto) {
    if (dto.getPhoto() == null || dto.getPhoto().isEmpty()) {
      String randomPhotoUrl = unsplashApiService.getRandomPhotoUrl("profile");
      // Since dto is final, we need to create a new instance or use a setter if available
      // For now, we'll assume the setter works directly
      dto.setPhoto(randomPhotoUrl);
    }
    return fournisseurService.save(dto);
  }

  @Override
  public FournisseurResponseDto findById(Integer id) {
    return fournisseurService.findById(id);
  }

  @Override
  public List<FournisseurResponseDto> findAll() {
    return fournisseurService.findAll();
  }

  @Override
  public void delete(Integer id) {
    fournisseurService.delete(id);
  }

  @Override
  public ResponseEntity<FournisseurResponseDto> update(Integer id, FournisseurRequestDto dto) {
    return ResponseEntity.ok(fournisseurService.update(id, dto));
  }
}