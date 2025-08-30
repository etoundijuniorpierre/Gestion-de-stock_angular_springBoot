package com.example.Gestion.de.stock.service.strategy;

import java.io.InputStream;

import com.example.Gestion.de.stock.dto.FournisseurDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.FournisseurService;
import com.example.Gestion.de.stock.service.PhotoStorageService;
import com.flickr4java.flickr.FlickrException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service("fournisseurStrategy")
@Slf4j
public class SaveFournisseurPhoto implements Strategy<FournisseurDto> {

  private final PhotoStorageService photoStorageService;
  private final FournisseurService fournisseurService;

  @Autowired
    public SaveFournisseurPhoto(PhotoStorageService photoStorageService, FournisseurService fournisseurService) {
        this.photoStorageService = photoStorageService;
        this.fournisseurService = fournisseurService;
    }




  @Override
  public FournisseurDto savePhoto(Integer id, InputStream photo, String titre) {
    FournisseurDto fournisseur = fournisseurService.findById(id);
    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo du fournisseur", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    fournisseur.setPhoto(urlPhoto);
    return fournisseurService.save(fournisseur);
  }
}
