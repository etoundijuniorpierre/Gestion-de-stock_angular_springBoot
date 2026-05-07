package com.example.Gestion.de.stock.service.serviceImpl;

import com.example.Gestion.de.stock.dto.mapper.AdresseMapper;
import com.example.Gestion.de.stock.dto.mapper.EntrepriseMapper;
import com.example.Gestion.de.stock.dto.mapper.UtilisateurMapper;
import com.example.Gestion.de.stock.dto.request.ChangerMotDePasseUtilisateurDto;
import com.example.Gestion.de.stock.dto.request.UtilisateurRequestDto;
import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.Utilisateur;
import com.example.Gestion.de.stock.repository.UtilisateurRepository;
import com.example.Gestion.de.stock.service.UtilisateurService;
import com.example.Gestion.de.stock.validator.UtilisateurValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Slf4j
public class UtilisateurServiceImpl implements UtilisateurService {

  private UtilisateurRepository utilisateurRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository,
      PasswordEncoder passwordEncoder) {
    this.utilisateurRepository = utilisateurRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UtilisateurResponseDto save(UtilisateurRequestDto dto) {
    List<String> errors = UtilisateurValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Utilisateur is not valid {}", dto);
      throw new InvalidEntityException("L'utilisateur n'est pas valide", ErrorCodes.UTILISATEUR_NOT_VALID, errors);
    }

//    if(userAlreadyExists(dto.getEmail())) {
//      throw new InvalidEntityException("Un autre utilisateur avec le meme email existe deja", ErrorCodes.UTILISATEUR_ALREADY_EXISTS,
//          Collections.singletonList("Un autre utilisateur avec le meme email existe deja dans la BDD"));
//    }

    Utilisateur utilisateur = UtilisateurMapper.toEntity(dto);
    
    // Encode password before saving
    String rawPassword = dto.getMotDePasse();
    String encodedPassword = passwordEncoder.encode(rawPassword);
    utilisateur.setMotDePasse(encodedPassword);
    log.info("Encoded password for user {}: {}", dto.getEmail(), encodedPassword);
    log.info("Raw password was: {}", rawPassword);

    Utilisateur savedUser = utilisateurRepository.save(utilisateur);
    return UtilisateurMapper.fromEntity(savedUser);
  }

//  private boolean userAlreadyExists(String email) {
//    Optional<Utilisateur> user = utilisateurRepository.findByEmail(email);
//    return user.isPresent();
//  }

  @Override
  public UtilisateurResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Utilisateur ID is null");
      return null;
    }
    return utilisateurRepository.findById(id)
        .map(UtilisateurMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucun utilisateur avec l'ID = " + id + " n' ete trouve dans la BDD",
            ErrorCodes.UTILISATEUR_NOT_FOUND)
        );
  }

  @Override
  public List<UtilisateurResponseDto> findAll() {
    return utilisateurRepository.findAll().stream()
        .map(UtilisateurMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Utilisateur ID is null");
      return;
    }
    utilisateurRepository.deleteById(id);
  }

  @Override
  public UtilisateurResponseDto findByEmail(String email) {
    return utilisateurRepository.findByEmail(email)
        .map(UtilisateurMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
        "Aucun utilisateur avec l'email = " + email + " n' ete trouve dans la BDD",
        ErrorCodes.UTILISATEUR_NOT_FOUND)
    );
  }

  @Override
  public UtilisateurResponseDto changerMotDePasse(ChangerMotDePasseUtilisateurDto dto) {
    validate(dto);
    Optional<Utilisateur> utilisateurOptional = utilisateurRepository.findById(dto.getId());
    if (utilisateurOptional.isEmpty()) {
      log.warn("Aucun utilisateur n'a ete trouve avec l'ID " + dto.getId());
      throw new EntityNotFoundException("Aucun utilisateur n'a ete trouve avec l'ID " + dto.getId(), ErrorCodes.UTILISATEUR_NOT_FOUND);
    }

    Utilisateur utilisateur = utilisateurOptional.get();
    utilisateur.setMotDePasse(passwordEncoder.encode(dto.getMotDePasse()));

    return UtilisateurMapper.fromEntity(
        utilisateurRepository.save(utilisateur)
    );
  }
  
  @Override
  public UtilisateurResponseDto updateUser(Integer id, UtilisateurRequestDto dto) {
    // For update, we need to find the existing user first
    Optional<Utilisateur> utilisateurOptional = utilisateurRepository.findById(id);
    if (utilisateurOptional.isEmpty()) {
      log.warn("Aucun utilisateur n'a ete trouve avec l'ID " + id);
      throw new EntityNotFoundException("Aucun utilisateur n'a ete trouve avec l'ID " + id, ErrorCodes.UTILISATEUR_NOT_FOUND);
    }
    
    // Convert the request DTO to entity
    Utilisateur updatedUser = UtilisateurMapper.toEntity(dto);
    updatedUser.setId(id); // Preserve the ID
    
    // Update password if provided
    if (dto.getMotDePasse() != null && !dto.getMotDePasse().isEmpty()) {
      String encodedPassword = passwordEncoder.encode(dto.getMotDePasse());
      updatedUser.setMotDePasse(encodedPassword);
      log.info("Password updated for user: {}", dto.getEmail());
    }
    
    // Save the updated user
    Utilisateur savedUser = utilisateurRepository.save(updatedUser);
    
    // Return the updated user DTO
    return UtilisateurMapper.fromEntity(savedUser);
  }

  private void validate(ChangerMotDePasseUtilisateurDto dto) {
    if (dto == null) {
      log.warn("Impossible de modifier le mot de passe avec un objet NULL");
      throw new InvalidOperationException("Aucune information n'a ete fourni pour pouvoir changer le mot de passe",
          ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_OBJECT_NOT_VALID);
    }
    if (dto.getId() == null) {
      log.warn("Impossible de modifier le mot de passe avec un ID NULL");
      throw new InvalidOperationException("ID utilisateur null:: Impossible de modifier le mote de passe",
          ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_OBJECT_NOT_VALID);
    }
    if (!StringUtils.hasLength(dto.getMotDePasse()) || !StringUtils.hasLength(dto.getConfirmMotDePasse())) {
      log.warn("Impossible de modifier le mot de passe avec un mot de passe NULL");
      throw new InvalidOperationException("Mot de passe utilisateur null:: Impossible de modifier le mote de passe",
          ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_OBJECT_NOT_VALID);
    }
    if (!dto.getMotDePasse().equals(dto.getConfirmMotDePasse())) {
      log.warn("Impossible de modifier le mot de passe avec deux mots de passe different");
      throw new InvalidOperationException("Mots de passe utilisateur non conformes:: Impossible de modifier le mote de passe",
          ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_OBJECT_NOT_VALID);
    }
  }
}