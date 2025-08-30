package com.example.Gestion.de.stock.service.strategy;

import com.example.Gestion.de.stock.dto.EntrepriseDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.EntrepriseService;

import com.example.Gestion.de.stock.service.PhotoStorageService;
import com.flickr4java.flickr.FlickrException;
import java.io.InputStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service("entrepriseStrategy")
@Slf4j
public class SaveEntreprisePhoto implements Strategy<EntrepriseDto> {

  private final PhotoStorageService photoStorageService;
  private final EntrepriseService entrepriseService;

  @Autowired
  public SaveEntreprisePhoto(PhotoStorageService photoStorageService, EntrepriseService entrepriseService) {
    this.photoStorageService = photoStorageService;
    this.entrepriseService = entrepriseService;
  }

  @Override
  public EntrepriseDto savePhoto(Integer id, InputStream photo, String titre) {
    EntrepriseDto entreprise = entrepriseService.findById(id);
    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo de l'entreprise", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    entreprise.setPhoto(urlPhoto);
    return entrepriseService.save(entreprise);
  }
}
