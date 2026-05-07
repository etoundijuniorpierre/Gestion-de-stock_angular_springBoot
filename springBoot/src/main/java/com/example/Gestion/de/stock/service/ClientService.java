package com.example.Gestion.de.stock.service;


import com.example.Gestion.de.stock.dto.request.ClientRequestDto;
import com.example.Gestion.de.stock.dto.response.ClientResponseDto;

import java.util.List;

public interface ClientService {

  ClientResponseDto save(ClientRequestDto dto);

  ClientResponseDto findById(Integer id);

  List<ClientResponseDto> findAll();

  void delete(Integer id);

    ClientResponseDto update(Integer id, ClientRequestDto dto);
}