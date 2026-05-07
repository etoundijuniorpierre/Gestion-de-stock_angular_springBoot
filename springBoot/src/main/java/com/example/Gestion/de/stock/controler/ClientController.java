package com.example.Gestion.de.stock.controler;


import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.ClientApi;
import com.example.Gestion.de.stock.dto.request.ClientRequestDto;
import com.example.Gestion.de.stock.dto.response.ClientResponseDto;
import com.example.Gestion.de.stock.service.ClientService;
import com.example.Gestion.de.stock.service.UnsplashApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController implements ClientApi {

  private final ClientService clientService;
  private final UnsplashApiService unsplashApiService;

  @Autowired
  public ClientController(ClientService clientService, UnsplashApiService unsplashApiService) {
    this.clientService = clientService;
      this.unsplashApiService = unsplashApiService;
  }

  @Override
  public ClientResponseDto save(ClientRequestDto dto) {
    if (dto.getPhoto() == null || dto.getPhoto().isEmpty()) {
      String randomPhotoUrl = unsplashApiService.getRandomPhotoUrl("profile");
      dto.setPhoto(randomPhotoUrl);
    }
    return clientService.save(dto);
  }

  @Override
  public ClientResponseDto findById(Integer id) {
    return clientService.findById(id);
  }

  @Override
  public List<ClientResponseDto> findAll() {
    return clientService.findAll();
  }

  @Override
  public void delete(Integer id) {
    clientService.delete(id);
  }

  @Override
  public ResponseEntity<ClientResponseDto> update(Integer id, ClientRequestDto dto) {
    return ResponseEntity.ok(clientService.update(id, dto));
  }
}