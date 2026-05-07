package com.example.Gestion.de.stock.controler;


import java.math.BigDecimal;
import java.util.List;

import com.example.Gestion.de.stock.controler.controllerApi.MvtStkApi;
import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;
import com.example.Gestion.de.stock.service.MvtStkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MvtStkController implements MvtStkApi {

  private MvtStkService service;

  @Autowired
  public MvtStkController(MvtStkService service) {
    this.service = service;
  }

  @Override
  public BigDecimal stockReelArticle(Integer idArticle) {
    return service.stockReelArticle(idArticle);
  }

  @Override
  public List<MvtStkResponseDto> mvtStkArticle(Integer idArticle) {
    return service.mvtStkArticle(idArticle);
  }

  @Override
  public MvtStkResponseDto entreeStock(MvtStkRequestDto dto) {
    return service.entreeStock(dto);
  }

  @Override
  public MvtStkResponseDto sortieStock(MvtStkRequestDto dto) {
    return service.sortieStock(dto);
  }

  @Override
  public MvtStkResponseDto correctionStockPos(MvtStkRequestDto dto) {
    return service.correctionStockPos(dto);
  }

  @Override
  public MvtStkResponseDto correctionStockNeg(MvtStkRequestDto dto) {
    return service.correctionStockNeg(dto);
  }
}
