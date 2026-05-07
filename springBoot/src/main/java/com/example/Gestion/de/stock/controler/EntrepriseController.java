package com.example.Gestion.de.stock.controler;

import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.EntrepriseApi;
import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import com.example.Gestion.de.stock.dto.response.EntrepriseResponseDto;
import com.example.Gestion.de.stock.service.EntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EntrepriseController implements EntrepriseApi {

  private EntrepriseService entrepriseService;

  @Autowired
  public EntrepriseController(EntrepriseService entrepriseService) {
    this.entrepriseService = entrepriseService;
  }

  @Override
  public EntrepriseResponseDto save(EntrepriseRequestDto dto) {
    return entrepriseService.save(dto);
  }

  @Override
  public EntrepriseResponseDto findById(Integer id) {
    return entrepriseService.findById(id);
  }

  @Override
  public List<EntrepriseResponseDto> findAll() {
    return entrepriseService.findAll();
  }

  @Override
  public void delete(Integer id) {
    entrepriseService.delete(id);
  }
}