package com.example.Gestion.de.stock.controler;


import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.CategorieApi;
import com.example.Gestion.de.stock.dto.CategorieDto;
import com.example.Gestion.de.stock.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategorieController implements CategorieApi {

  private CategorieService categorieService;

  @Autowired
  public CategorieController(CategorieService categorieService) {
    this.categorieService = categorieService;
  }

  @Override
  public CategorieDto save(CategorieDto dto) {
    return categorieService.save(dto);
  }

  @Override
  public CategorieDto findById(Integer idCategorie) {
    return categorieService.findById(idCategorie);
  }

  @Override
  public CategorieDto findByCode(String codeCategorie) {
    return categorieService.findCategorieByCode(codeCategorie);
  }

  @Override
  public List<CategorieDto> findAll() {
    return categorieService.findAll();
  }

  @Override
  public void delete(Integer id) {
    categorieService.delete(id);
  }
}
