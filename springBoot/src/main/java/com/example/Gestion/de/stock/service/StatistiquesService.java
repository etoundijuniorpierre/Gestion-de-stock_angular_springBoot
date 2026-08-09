package com.example.Gestion.de.stock.service;

import com.example.Gestion.de.stock.dto.StatistiquesDto;
import jakarta.transaction.Transactional;

public interface StatistiquesService {
    @Transactional
    StatistiquesDto getStatistiques();
}
