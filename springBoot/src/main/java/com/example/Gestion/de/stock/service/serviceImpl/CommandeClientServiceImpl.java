package com.example.Gestion.de.stock.service.serviceImpl;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.mapper.ArticleMapper;
import com.example.Gestion.de.stock.dto.mapper.CommandeClientMapper;
import com.example.Gestion.de.stock.dto.mapper.LigneCommandeClientMapper;
import com.example.Gestion.de.stock.dto.request.CommandeClientRequestDto;
import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.ArticleResponseDto;
import com.example.Gestion.de.stock.dto.response.CommandeClientResponseDto;
import com.example.Gestion.de.stock.dto.response.LigneCommandeClientResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.Article;
import com.example.Gestion.de.stock.model.entity.Client;
import com.example.Gestion.de.stock.model.entity.CommandeClient;
import com.example.Gestion.de.stock.model.entity.LigneCommandeClient;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import com.example.Gestion.de.stock.model.enumElem.SourceMvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import com.example.Gestion.de.stock.repository.ArticleRepository;
import com.example.Gestion.de.stock.repository.ClientRepository;
import com.example.Gestion.de.stock.repository.CommandeClientRepository;
import com.example.Gestion.de.stock.repository.LigneCdeCltRepository;
import com.example.Gestion.de.stock.service.CommandeClientService;
import com.example.Gestion.de.stock.service.MvtStkService;
import com.example.Gestion.de.stock.validator.ArticleValidator;
import com.example.Gestion.de.stock.validator.CommandeClientValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service

public class CommandeClientServiceImpl implements CommandeClientService {

  private final CommandeClientRepository commandeClientRepository;
  private final LigneCdeCltRepository ligneCdeCltRepository;
  private final ClientRepository clientRepository;
  private final ArticleRepository articleRepository;
  private final MvtStkService mvtStkService;

  @Autowired
  public CommandeClientServiceImpl(CommandeClientRepository commandeClientRepository,
                                   ClientRepository clientRepository, ArticleRepository articleRepository, LigneCdeCltRepository ligneCdeCltRepository,
                                   MvtStkService mvtStkService) {
    this.commandeClientRepository = commandeClientRepository;
    this.ligneCdeCltRepository = ligneCdeCltRepository;
    this.clientRepository = clientRepository;
    this.articleRepository = articleRepository;
    this.mvtStkService = mvtStkService;
  }

  @Override
  public CommandeClientResponseDto save(CommandeClientRequestDto dto) {

    List<String> errors = CommandeClientValidator.validate(dto);

    if (!errors.isEmpty()) {
      log.error("Commande client n'est pas valide");
      throw new InvalidEntityException("La commande client n'est pas valide", ErrorCodes.COMMANDE_CLIENT_NOT_VALID, errors);
    }

    // Check if commande is already delivered (if updating)
    if (dto.getCode() != null) {
      Optional<CommandeClient> existingCmd = commandeClientRepository.findCommandeClientByCode(dto.getCode());
      if (existingCmd.isPresent() && existingCmd.get().getEtatCommande() == EtatCommande.LIVREE) {
        throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livree", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
      }
    }

    // Récupérer le client par ID depuis la base de données
    if (dto.getClientId() == null) {
      log.error("Client ID is null");
      throw new InvalidEntityException("Le client ID est obligatoire", ErrorCodes.CLIENT_NOT_FOUND);
    }
    Optional<Client> clientOptional = clientRepository.findById(dto.getClientId());
    if (clientOptional.isEmpty()) {
      throw new EntityNotFoundException("Aucun client trouvé avec l'ID " + dto.getClientId(), ErrorCodes.CLIENT_NOT_FOUND);
    }
    Client clientEntity = clientOptional.get();
    log.info("Retrieved client with ID: " + dto.getClientId());

    List<String> articleErrors = new ArrayList<>();

    if (dto.getLigneCommandeClients() != null) {
      dto.getLigneCommandeClients().forEach(ligCmdClt -> {
        if (ligCmdClt.getIdArticle() == null) {
          articleErrors.add("Impossible d'enregistrer une commande sans idArticle");
        } else {
          Optional<Article> article = articleRepository.findById(ligCmdClt.getIdArticle());
          if (article.isEmpty()) {
            articleErrors.add("L'article avec l'ID " + ligCmdClt.getIdArticle() + " n'existe pas");
          }
        }
      });
    }

    if (!articleErrors.isEmpty()) {
      log.warn("");
      throw new InvalidEntityException("Article n'existe pas dans la BDD", ErrorCodes.ARTICLE_NOT_FOUND, articleErrors);
    }
    CommandeClient commandeClient = CommandeClientMapper.toEntity(dto);
    commandeClient.setClient(clientEntity);
    commandeClient.setDateCommande(dto.getDateCommande() != null ? dto.getDateCommande() : LocalDate.now());
    CommandeClient savedCmdClt = commandeClientRepository.save(commandeClient);

    if (dto.getLigneCommandeClients() != null) {
      dto.getLigneCommandeClients().forEach(ligCmdClt -> {
        LigneCommandeClient ligneCommandeClient = LigneCommandeClientMapper.toEntity(ligCmdClt);
        ligneCommandeClient.setCommandeClient(savedCmdClt);
        ligneCommandeClient.setIdEntreprise(dto.getIdEntreprise());
        
        // Set the article from repository
        if (ligCmdClt.getIdArticle() != null) {
          articleRepository.findById(ligCmdClt.getIdArticle())
            .ifPresent(ligneCommandeClient::setArticle);
        }
        
        ligneCdeCltRepository.save(ligneCommandeClient);
      });
    }

    return CommandeClientMapper.fromEntity(savedCmdClt);
  }

  @Override
  public CommandeClientResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Commande client ID is NULL");
      return null;
    }
    return commandeClientRepository.findById(id)
            .map(CommandeClientMapper::fromEntity)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune commande client n'a ete trouve avec l'ID " + id, ErrorCodes.COMMANDE_CLIENT_NOT_FOUND
            ));
  }

  @Override
  public CommandeClientResponseDto findByCode(String code) {
    if (!StringUtils.hasLength(code)) {
      log.error("Commande client CODE is NULL");
      return null;
    }
    return commandeClientRepository.findCommandeClientByCode(code)
            .map(CommandeClientMapper::fromEntity)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune commande client n'a ete trouve avec le CODE " + code, ErrorCodes.COMMANDE_CLIENT_NOT_FOUND
            ));
  }

  @Override
  public List<CommandeClientResponseDto> findAll() {
    return commandeClientRepository.findAll().stream()
            .map(CommandeClientMapper::fromEntity)
            .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Commande client ID is NULL");
      return;
    }
    List<LigneCommandeClient> ligneCommandeClients = ligneCdeCltRepository.findAllByCommandeClientId(id);
    if (!ligneCommandeClients.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer une commande client deja utilisee",
              ErrorCodes.COMMANDE_CLIENT_ALREADY_IN_USE);
    }
    commandeClientRepository.deleteById(id);
  }

  @Override
  public List<LigneCommandeClientResponseDto> findAllLignesCommandesClientByCommandeClientId(Integer idCommande) {
    return ligneCdeCltRepository.findAllByCommandeClientId(idCommande).stream()
            .map(LigneCommandeClientMapper::fromEntity)
            .collect(Collectors.toList());
  }

  @Override
  public CommandeClientResponseDto updateEtatCommande(Integer idCommande, EtatCommande etatCommande) {
    checkIdCommande(idCommande);
    if (!StringUtils.hasLength(String.valueOf(etatCommande))) {
      log.error("L'etat de la commande client is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un etat null",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
    CommandeClientResponseDto commandeClient = checkEtatCommande(idCommande);
    
    CommandeClient entity = commandeClientRepository.findById(idCommande).get();
    entity.setEtatCommande(etatCommande);
    CommandeClient savedCmdClt = commandeClientRepository.save(entity);
    if (commandeClient.isCommandeLivree()) {
      updateMvtStk(idCommande);
    }

    return CommandeClientMapper.fromEntity(savedCmdClt);
  }

  @Override
  public CommandeClientResponseDto updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite) {
    checkIdCommande(idCommande);
    checkIdLigneCommande(idLigneCommande);

    if (quantite == null || quantite.compareTo(BigDecimal.ZERO) == 0) {
      log.error("L'ID de la ligne commande is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec une quantite null ou ZERO",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }

    CommandeClientResponseDto commandeClient = checkEtatCommande(idCommande);
    Optional<LigneCommandeClient> ligneCdeCltOptional = findligneCdeClt(idLigneCommande);

    LigneCommandeClient ligneCommandeClient = ligneCdeCltOptional.get();
    ligneCommandeClient.setQuantite(quantite);
    ligneCdeCltRepository.save(ligneCommandeClient);

    return commandeClient;
  }


  @Override
  public CommandeClientResponseDto updateClient(Integer idCommande, Integer idClient) {
    checkIdCommande(idCommande);
    if (idClient == null) {
      log.error("L'ID du client is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un ID client null",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
    checkEtatCommande(idCommande);
    
    Optional<Client> clientOptional = clientRepository.findById(idClient);
    if (clientOptional.isEmpty()) {
      throw new EntityNotFoundException(
              "Aucun client n'a ete trouve avec l'ID " + idClient, ErrorCodes.CLIENT_NOT_FOUND);
    }
    
    CommandeClient entity = commandeClientRepository.findById(idCommande).get();
    entity.setClient(clientOptional.get());
    CommandeClient savedEntity = commandeClientRepository.save(entity);

    return CommandeClientMapper.fromEntity(savedEntity);
  }

  @Override
  public CommandeClientResponseDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle) {
    checkIdCommande(idCommande);
    checkIdLigneCommande(idLigneCommande);
    checkIdArticle(idArticle, "nouvel");

    CommandeClientResponseDto commandeClient = checkEtatCommande(idCommande);

    findligneCdeClt(idLigneCommande);

    Optional<Article> articleOptional = articleRepository.findById(idArticle);
    if (articleOptional.isEmpty()) {
      throw new EntityNotFoundException(
              "Aucune article n'a ete trouve avec l'ID " + idArticle, ErrorCodes.ARTICLE_NOT_FOUND);
    }

    ArticleResponseDto articleDto = ArticleMapper.fromEntity(articleOptional.get());
    List<String> errors = ArticleValidator.validateEntity(articleOptional.get());
    if (!errors.isEmpty()) {
      throw new InvalidEntityException("Article invalid", ErrorCodes.ARTICLE_NOT_VALID, errors);
    }

    LigneCommandeClient ligneCommandeClientToSaved = ligneCdeCltRepository.findById(idLigneCommande).get();
    ligneCommandeClientToSaved.setArticle(articleOptional.get());
    ligneCdeCltRepository.save(ligneCommandeClientToSaved);

    return commandeClient;
  }

  @Override
  public CommandeClientResponseDto deleteArticle(Integer idCommande, Integer idLigneCommande) {
    checkIdCommande(idCommande);
    checkIdLigneCommande(idLigneCommande);

    CommandeClientResponseDto commandeClient = checkEtatCommande(idCommande);
    // Just to check the LigneCdeClt and inform the client in case it is absent
    findligneCdeClt(idLigneCommande);
    ligneCdeCltRepository.deleteById(idLigneCommande);

    return commandeClient;
  }

  private CommandeClientResponseDto checkEtatCommande(Integer idCommande) {
    CommandeClientResponseDto commandeClient = findById(idCommande);
    if (commandeClient.isCommandeLivree()) {
      throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livree", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
    return commandeClient;
  }

  private Optional<LigneCommandeClient> findligneCdeClt(Integer idLigneCommande) {
    Optional<LigneCommandeClient> ligneCdeCltOptional = ligneCdeCltRepository.findById(idLigneCommande);
    if (ligneCdeCltOptional.isEmpty()) {
      throw new EntityNotFoundException(
              "Aucune ligne commande client n'a ete trouve avec l'ID " + idLigneCommande, ErrorCodes.COMMANDE_CLIENT_NOT_FOUND);
    }
    return ligneCdeCltOptional;
  }

  private void checkIdCommande(Integer idCommande) {
    if (idCommande == null) {
      log.error("Commande client ID is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un ID null",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
  }

  private void checkIdLigneCommande(Integer idLigneCommande) {
    if (idLigneCommande == null) {
      log.error("L'ID de la ligne commande is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec une ligne de commande null",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
  }

  private void checkIdArticle(Integer idArticle, String msg) {
    if (idArticle == null) {
      log.error("L'ID de " + msg + " is NULL");
      throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un " + msg + " ID article null",
              ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
    }
  }

  private void updateMvtStk(Integer idCommande) {
    List<LigneCommandeClient> ligneCommandeClients = ligneCdeCltRepository.findAllByCommandeClientId(idCommande);
    ligneCommandeClients.forEach(this::effectuerSortie);
  }

  private void effectuerSortie(LigneCommandeClient lig) {
    MvtStkRequestDto requestDto = MvtStkRequestDto.builder()
            .article(ArticleMapper.toRequestDto(lig.getArticle()))
            .dateMvt(LocalDate.now())
            .typeMvt(TypeMvtStk.SORTIE)
            .sourceMvt(SourceMvtStk.COMMANDE_CLIENT)
            .quantite(lig.getQuantite())
            .idEntreprise(lig.getIdEntreprise())
            .build();
    mvtStkService.sortieStock(requestDto);
  }
}
