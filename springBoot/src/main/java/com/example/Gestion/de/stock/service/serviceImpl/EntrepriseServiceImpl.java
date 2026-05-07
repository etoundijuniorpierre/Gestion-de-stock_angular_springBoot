package com.example.Gestion.de.stock.service.serviceImpl;


import com.example.Gestion.de.stock.dto.mapper.AdresseMapper;
import com.example.Gestion.de.stock.dto.mapper.EntrepriseMapper;
import com.example.Gestion.de.stock.dto.mapper.RolesMapper;
import com.example.Gestion.de.stock.dto.request.EntrepriseRequestDto;
import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.EntrepriseResponseDto;
import com.example.Gestion.de.stock.dto.response.RolesResponseDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.model.entity.Entreprise;
import com.example.Gestion.de.stock.model.entity.Roles;
import com.example.Gestion.de.stock.model.entity.Utilisateur;
import com.example.Gestion.de.stock.repository.EntrepriseRepository;
import com.example.Gestion.de.stock.repository.RolesRepository;
import com.example.Gestion.de.stock.repository.UtilisateurRepository;
import com.example.Gestion.de.stock.service.EntrepriseService;
import com.example.Gestion.de.stock.service.UtilisateurService;
import com.example.Gestion.de.stock.validator.EntrepriseValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

//@Transactional(rollbackOn = Exception.class)
@Service
@Slf4j
public class EntrepriseServiceImpl implements EntrepriseService {

  private EntrepriseRepository entrepriseRepository;
  private UtilisateurService utilisateurService;
  private RolesRepository rolesRepository;
  private UtilisateurRepository utilisateurRepository;

  @Autowired
  public EntrepriseServiceImpl(EntrepriseRepository entrepriseRepository, UtilisateurService utilisateurService,
      RolesRepository rolesRepository, UtilisateurRepository utilisateurRepository) {
    this.entrepriseRepository = entrepriseRepository;
    this.utilisateurService = utilisateurService;
    this.rolesRepository = rolesRepository;
    this.utilisateurRepository = utilisateurRepository;
  }

  @Override
  @Transactional
  public EntrepriseResponseDto save(EntrepriseRequestDto dto) {
    // Validation de l'entreprise
    List<String> errors = EntrepriseValidator.validate(dto);
    if (!errors.isEmpty()) {
        throw new InvalidEntityException("L'entreprise n'est pas valide", ErrorCodes.ENTREPRISE_NOT_VALID, errors);
    }

    // Conversion DTO -> Entity et sauvegarde
    Entreprise entreprise = EntrepriseMapper.toEntity(dto);
    Entreprise savedEntreprise = entrepriseRepository.save(entreprise);
    EntrepriseResponseDto savedEntrepriseDto = EntrepriseMapper.fromEntity(savedEntreprise);

    // Création de l'utilisateur associé à l'entreprise
    UtilisateurRequestDto utilisateurDto = fromEntreprise(savedEntrepriseDto);
    UtilisateurResponseDto savedUserDto = utilisateurService.save(utilisateurDto);

    // Récupérer l'entité utilisateur persistée pour créer le rôle
    Utilisateur savedUserEntity = utilisateurRepository.findByEmail(savedUserDto.getEmail())
        .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé après sauvegarde", ErrorCodes.UTILISATEUR_NOT_FOUND));

    // Attribution du rôle ADMIN à l'utilisateur
    RolesResponseDto rolesDto = RolesResponseDto.builder()
            .roleName("ADMIN")
            .utilisateur(savedUserDto) // DTO pour la réponse
            .build();

    Roles roleEntity = RolesMapper.toEntity(rolesDto);
    roleEntity.setUtilisateur(savedUserEntity); // Assigner l'entité persistée
    rolesRepository.save(roleEntity);

    return savedEntrepriseDto;
  }

  private UtilisateurRequestDto fromEntreprise(EntrepriseResponseDto dto) {
    return UtilisateurRequestDto.builder()
        .adresse(AdresseMapper.toRequestDto(dto.getAdresse()))
        .nom(dto.getNom())
        .prenom(dto.getCodeFiscal())
        .email(dto.getEmail())
        .motDePasse(generateRandomPassword())
        .entrepriseId(dto.getId()) // On passe seulement l'ID
        .dateDeNaissance(LocalDate.now())
        .photo(dto.getPhoto())
        .build();
  }

  private String generateRandomPassword() {
    return "som3R@nd0mP@$$word";
  }
  @Override
  public EntrepriseResponseDto findById(Integer id) {
    if (id == null) {

      return null;
    }
    return entrepriseRepository.findById(id)
        .map(EntrepriseMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucune entreprise avec l'ID = " + id + " n' ete trouve dans la BDD",
            ErrorCodes.ENTREPRISE_NOT_FOUND)
        );
  }

  @Override
  public List<EntrepriseResponseDto> findAll() {
    return entrepriseRepository.findAll().stream()
        .map(EntrepriseMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      return;
    }
    entrepriseRepository.deleteById(id);
  }
}