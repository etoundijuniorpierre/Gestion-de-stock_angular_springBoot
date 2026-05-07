package com.example.Gestion.de.stock.service.serviceImpl;


import java.util.List;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.mapper.AdresseMapper;
import com.example.Gestion.de.stock.dto.mapper.FournisseurMapper;
import com.example.Gestion.de.stock.dto.request.FournisseurRequestDto;
import com.example.Gestion.de.stock.dto.response.FournisseurResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.CommandeFournisseur;
import com.example.Gestion.de.stock.model.entity.Fournisseur;
import com.example.Gestion.de.stock.repository.CommandeFournisseurRepository;
import com.example.Gestion.de.stock.repository.FournisseurRepository;
import com.example.Gestion.de.stock.service.FournisseurService;
import com.example.Gestion.de.stock.validator.FournisseurValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class FournisseurServiceImpl implements FournisseurService {

  private final FournisseurRepository fournisseurRepository;
  private final CommandeFournisseurRepository commandeFournisseurRepository;

  @Autowired
  public FournisseurServiceImpl(FournisseurRepository fournisseurRepository,
      CommandeFournisseurRepository commandeFournisseurRepository) {
    this.fournisseurRepository = fournisseurRepository;
    this.commandeFournisseurRepository = commandeFournisseurRepository;
  }

  @Override
  public FournisseurResponseDto save(FournisseurRequestDto dto) {
    List<String> errors = FournisseurValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Fournisseur is not valid {}", dto);
      throw new InvalidEntityException("Le fournisseur n'est pas valide", ErrorCodes.FOURNISSEUR_NOT_VALID, errors);
    }

    return FournisseurMapper.fromEntity(
        fournisseurRepository.save(
            FournisseurMapper.toEntity(dto)
        )
    );
  }

  @Override
  public FournisseurResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Fournisseur ID is null");
      return null;
    }
    return fournisseurRepository.findById(id)
        .map(FournisseurMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucun fournisseur avec l'ID = " + id + " n' ete trouve dans la BDD",
            ErrorCodes.FOURNISSEUR_NOT_FOUND)
        );
  }

  @Override
  public List<FournisseurResponseDto> findAll() {
    return fournisseurRepository.findAll().stream()
        .map(FournisseurMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Fournisseur ID is null");
      return;
    }
    List<CommandeFournisseur> commandeFournisseur = commandeFournisseurRepository.findAllByFournisseurId(id);
    if (!commandeFournisseur.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer un fournisseur qui a deja des commandes",
          ErrorCodes.FOURNISSEUR_ALREADY_IN_USE);
    }
    fournisseurRepository.deleteById(id);
  }

  @Override
  public FournisseurResponseDto update(Integer id, FournisseurRequestDto dto) {
    if (id == null) {
      log.error("frs ID is null");
      throw new InvalidOperationException("Impossible de mettre à jour un frs avec un ID NULL",
              ErrorCodes.CLIENT_NOT_VALID);
    }

    Fournisseur existingFournisseur = fournisseurRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                    "Aucun frs avec l'ID = " + id + " n'a été trouvé dans la BDD",
                    ErrorCodes.FOURNISSEUR_NOT_FOUND
            ));

    List<String> errors = FournisseurValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("frs is not valid {}", dto);
      throw new InvalidEntityException("Le frs n'est pas valide", ErrorCodes.FOURNISSEUR_NOT_VALID, errors);
    }

    existingFournisseur.setNom(dto.getNom());
    existingFournisseur.setPrenom(dto.getPrenom());
    existingFournisseur.setAdresse(AdresseMapper.toEntity(dto.getAdresse()));
    existingFournisseur.setPhoto(dto.getPhoto());
    existingFournisseur.setMail(dto.getMail());
    existingFournisseur.setNumTel(dto.getNumTel());
    existingFournisseur.setIdEntreprise(dto.getIdEntreprise());

    Fournisseur updatedFournisseur = fournisseurRepository.save(existingFournisseur);

    return FournisseurMapper.fromEntity(updatedFournisseur);
  }
}