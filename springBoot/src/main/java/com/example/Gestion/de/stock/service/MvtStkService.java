package com.example.Gestion.de.stock.service;

import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;

import java.math.BigDecimal;
import java.util.List;

public interface MvtStkService {

  BigDecimal stockReelArticle(Integer idArticle);

  List<MvtStkResponseDto> mvtStkArticle(Integer idArticle);

  MvtStkResponseDto entreeStock(MvtStkRequestDto dto);

  MvtStkResponseDto sortieStock(MvtStkRequestDto dto);

  MvtStkResponseDto correctionStockPos(MvtStkRequestDto dto);

  MvtStkResponseDto correctionStockNeg(MvtStkRequestDto dto);

}
