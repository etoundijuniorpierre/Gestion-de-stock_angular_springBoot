package com.example.Gestion.de.stock.controler;


import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.VentesApi;
import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;
import com.example.Gestion.de.stock.service.VentesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VentesController implements VentesApi {

  private final VentesService ventesService;

  @Autowired
  public VentesController(VentesService ventesService) {
    this.ventesService = ventesService;
  }

  @Override
  public VentesResponseDto save(VentesRequestDto dto) {
    return ventesService.save(dto);
  }

  @Override
  public VentesResponseDto findById(Integer id) {
    return ventesService.findById(id);
  }

  @Override
  public VentesResponseDto findByCode(String code) {
    return ventesService.findByCode(code);
  }

  @Override
  public List<VentesResponseDto> findAll() {
    return ventesService.findAll();
  }

  @Override
  public void delete(Integer id) {
    ventesService.delete(id);
  }
}