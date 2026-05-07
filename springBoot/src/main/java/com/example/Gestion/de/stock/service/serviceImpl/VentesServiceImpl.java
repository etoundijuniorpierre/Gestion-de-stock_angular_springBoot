package com.example.Gestion.de.stock.service.serviceImpl;



import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.Gestion.de.stock.dto.mapper.ArticleMapper;
import com.example.Gestion.de.stock.dto.mapper.LigneVenteMapper;
import com.example.Gestion.de.stock.dto.mapper.VentesMapper;
import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.request.VentesRequestDto;
import com.example.Gestion.de.stock.dto.response.VentesResponseDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;
import com.example.Gestion.de.stock.exception.EntityNotFoundException;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidEntityException;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.model.entity.Article;
import com.example.Gestion.de.stock.model.entity.LigneVente;
import com.example.Gestion.de.stock.model.entity.Ventes;
import com.example.Gestion.de.stock.model.enumElem.SourceMvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import com.example.Gestion.de.stock.repository.ArticleRepository;
import com.example.Gestion.de.stock.repository.LigneVenteRepository;
import com.example.Gestion.de.stock.repository.VentesRepository;
import com.example.Gestion.de.stock.service.MvtStkService;
import com.example.Gestion.de.stock.service.VentesService;
import com.example.Gestion.de.stock.validator.VentesValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Slf4j
public class VentesServiceImpl implements VentesService {

  private ArticleRepository articleRepository;
  private VentesRepository ventesRepository;
  private LigneVenteRepository ligneVenteRepository;
  private MvtStkService mvtStkService;

  @Autowired
  public VentesServiceImpl(ArticleRepository articleRepository, VentesRepository ventesRepository,
      LigneVenteRepository ligneVenteRepository, MvtStkService mvtStkService) {
    this.articleRepository = articleRepository;
    this.ventesRepository = ventesRepository;
    this.ligneVenteRepository = ligneVenteRepository;
    this.mvtStkService = mvtStkService;
  }

  @Override
  public VentesResponseDto save(VentesRequestDto dto) {
    List<String> errors = VentesValidator.validate(dto);
    if (!errors.isEmpty()) {
      log.error("Ventes n'est pas valide");
      throw new InvalidEntityException("L'objet vente n'est pas valide", ErrorCodes.VENTE_NOT_VALID, errors);
    }

    List<String> articleErrors = new ArrayList<>();

    if (dto.getLigneVentes() != null) {
      dto.getLigneVentes().forEach(ligneVenteDto -> {
        Optional<Article> article = articleRepository.findById(ligneVenteDto.getIdArticle());
        if (article.isEmpty()) {
          articleErrors.add("Aucun article avec l'ID " + ligneVenteDto.getIdArticle() + " n'a ete trouve dans la BDD");
        }
      });
    }

    if (!articleErrors.isEmpty()) {
      log.error("One or more articles were not found in the DB, {}", errors);
      throw new InvalidEntityException("Un ou plusieurs articles n'ont pas ete trouve dans la BDD", ErrorCodes.VENTE_NOT_VALID, errors);
    }

    Ventes savedVentes = ventesRepository.save(VentesMapper.toEntity(dto));

    dto.getLigneVentes().forEach(ligneVenteDto -> {
      LigneVente ligneVente = LigneVenteMapper.toEntity(ligneVenteDto);
      ligneVente.setVente(savedVentes);
      ligneVenteRepository.save(ligneVente);
      updateMvtStk(ligneVente);
    });

    return VentesMapper.fromEntity(savedVentes);
  }

  @Override
  public VentesResponseDto findById(Integer id) {
    if (id == null) {
      log.error("Ventes ID is NULL");
      return null;
    }
    return ventesRepository.findById(id)
        .map(VentesMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException("Aucun vente n'a ete trouve dans la BDD", ErrorCodes.VENTE_NOT_FOUND));
  }

  @Override
  public VentesResponseDto findByCode(String code) {
    if (!StringUtils.hasLength(code)) {
      log.error("Vente CODE is NULL");
      return null;
    }
    return ventesRepository.findVentesByCode(code)
        .map(VentesMapper::fromEntity)
        .orElseThrow(() -> new EntityNotFoundException(
            "Aucune vente client n'a ete trouve avec le CODE " + code, ErrorCodes.VENTE_NOT_VALID
        ));
  }

  @Override
  public List<VentesResponseDto> findAll() {
    return ventesRepository.findAll().stream()
        .map(VentesMapper::fromEntity)
        .collect(Collectors.toList());
  }

  @Override
  public void delete(Integer id) {
    if (id == null) {
      log.error("Vente ID is NULL");
      return;
    }
    List<LigneVente> ligneVentes = ligneVenteRepository.findAllByVenteId(id);
    if (!ligneVentes.isEmpty()) {
      throw new InvalidOperationException("Impossible de supprimer une vente ...",
          ErrorCodes.VENTE_ALREADY_IN_USE);
    }
    ventesRepository.deleteById(id);
  }

  private void updateMvtStk(LigneVente lig) {
    MvtStkRequestDto mvtStkDto = MvtStkRequestDto.builder()
        .article(ArticleMapper.toRequestDto(lig.getArticle()))
        .dateMvt(LocalDate.now())
        .typeMvt(TypeMvtStk.SORTIE)
        .sourceMvt(SourceMvtStk.VENTE)
        .quantite(lig.getQuantite())
        .idEntreprise(lig.getIdEntreprise())
        .build();
    mvtStkService.sortieStock(mvtStkDto);
  }
}