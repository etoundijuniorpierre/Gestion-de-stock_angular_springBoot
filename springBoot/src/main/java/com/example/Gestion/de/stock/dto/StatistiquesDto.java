package com.example.Gestion.de.stock.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatistiquesDto {
    private long totalArticles;
    private long totalClients;
    private long totalFournisseurs;
    private long totalCommandesClients;
    private long totalCommandesFournisseurs;
    private long totalVentes;
}
