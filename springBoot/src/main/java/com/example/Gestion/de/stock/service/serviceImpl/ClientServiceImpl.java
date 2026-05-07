package com.example.Gestion.de.stock.service.serviceImpl;


import java.util.List;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.mapper.AdresseMapper;
import com.example.Gestion.de.stock.dto.mapper.ClientMapper;
import com.example.Gestion.de.stock.dto.request.ClientRequestDto;
import com.example.Gestion.de.stock.dto.response.ClientResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.Client;
import com.example.Gestion.de.stock.model.entity.CommandeClient;
import com.example.Gestion.de.stock.repository.ClientRepository;
import com.example.Gestion.de.stock.repository.CommandeClientRepository;
import com.example.Gestion.de.stock.service.ClientService;
import com.example.Gestion.de.stock.validator.ClientValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ClientServiceImpl implements ClientService {

  private ClientRepository clientRepository;
  private CommandeClientRepository commandeClientRepository;

  @Autowired
  public ClientServiceImpl(ClientRepository clientRepository, CommandeClientRepository commandeClientRepository) {
    this.clientRepository = clientRepository;
    this.commandeClientRepository = commandeClientRepository;
  }

  @Override
  public ClientResponseDto save(ClientRequestDto dto) {
    List<String> errors = ClientValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Client is not valid {}", dto);
      throw new InvalidEntityException("Le client n'est pas valide", ErrorCodes.CLIENT_NOT_VALID, errors);
    }

    Client client = ClientMapper.toEntity(dto);
    Client savedClient = clientRepository.save(client);
    return ClientMapper.fromEntity(savedClient);
  }

  @Override
  public ClientResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Client ID is null");
      return null;
    }
    return clientRepository.findById(id)
        .map(ClientMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucun Client avec l'ID = " + id + " n' ete trouve dans la BDD",
            ErrorCodes.CLIENT_NOT_FOUND)
        );
  }

  @Override
  public List<ClientResponseDto> findAll() {
    return clientRepository.findAll().stream()
        .map(ClientMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Client ID is null");
      return;
    }
    List<CommandeClient> commandeClients = commandeClientRepository.findAllByClientId(id);
    if (!commandeClients.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer un client qui a deja des commande clients",
          ErrorCodes.CLIENT_ALREADY_IN_USE);
    }
    clientRepository.deleteById(id);
  }

  @Override
  public ClientResponseDto update(Integer id, ClientRequestDto dto) {
    if (id == null) {
      log.error("Client ID is null");
      throw new InvalidOperationException("Impossible de mettre à jour un client avec un ID NULL",
              ErrorCodes.CLIENT_NOT_VALID);
    }

    Client existingClient = clientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucun client avec l'ID = " + id + " n'a été trouvé dans la BDD",
                    ErrorCodes.CLIENT_NOT_FOUND
            ));

    List<String> errors = ClientValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Client is not valid {}", dto);
      throw new InvalidEntityException("Le client n'est pas valide", ErrorCodes.CLIENT_NOT_VALID, errors);
    }

    Client updatedClient = ClientMapper.toEntity(dto);
    updatedClient.setId(id); // Preserve the ID
    Client savedClient = clientRepository.save(updatedClient);

    return ClientMapper.fromEntity(savedClient);
  }
}