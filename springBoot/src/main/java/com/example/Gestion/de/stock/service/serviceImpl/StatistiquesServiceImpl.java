package com.example.Gestion.de.stock.service.serviceImpl;

import com.example.Gestion.de.stock.dto.StatistiquesDto;
import com.example.Gestion.de.stock.repository.ArticleRepository;
import com.example.Gestion.de.stock.repository.ClientRepository;
import com.example.Gestion.de.stock.repository.FournisseurRepository;
import com.example.Gestion.de.stock.repository.CommandeClientRepository;
import com.example.Gestion.de.stock.repository.CommandeFournisseurRepository;
import com.example.Gestion.de.stock.repository.VentesRepository;
import com.example.Gestion.de.stock.service.StatistiquesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StatistiquesServiceImpl implements StatistiquesService {

    private final ArticleRepository articleRepository;
    private final ClientRepository clientRepository;
    private final FournisseurRepository fournisseurRepository;
    private final CommandeClientRepository commandeClientRepository;
    private final CommandeFournisseurRepository commandeFournisseurRepository;
    private final VentesRepository ventesRepository;

    @Autowired
    public StatistiquesServiceImpl(
            ArticleRepository articleRepository,
            ClientRepository clientRepository,
            FournisseurRepository fournisseurRepository,
            CommandeClientRepository commandeClientRepository,
            CommandeFournisseurRepository commandeFournisseurRepository,
            VentesRepository ventesRepository) {
        this.articleRepository = articleRepository;
        this.clientRepository = clientRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.commandeClientRepository = commandeClientRepository;
        this.commandeFournisseurRepository = commandeFournisseurRepository;
        this.ventesRepository = ventesRepository;
    }

    @Override
    public StatistiquesDto getStatistiques() {
        return StatistiquesDto.builder()
                .totalArticles(articleRepository.count())
                .totalClients(clientRepository.count())
                .totalFournisseurs(fournisseurRepository.count())
                .totalCommandesClients(commandeClientRepository.count())
                .totalCommandesFournisseurs(commandeFournisseurRepository.count())
                .totalVentes(ventesRepository.count())
                .build();
    }
}
