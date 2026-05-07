package com.example.Gestion.de.stock.service.strategy;// package com.example.Gestion.de.stock.service.serviceImpl; (Adjust package as needed)

import com.example.Gestion.de.stock.dto.response.UtilisateurResponseDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.PhotoStorageService; // Import the new interface
import com.example.Gestion.de.stock.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.io.InputStream;
// import com.flickr4java.flickr.FlickrException; // Remove if not used
import lombok.extern.slf4j.Slf4j;

@Service("utilisateurStrategy")
@Slf4j
public class SaveUtilisateurPhoto implements Strategy<UtilisateurResponseDto> {

  private final PhotoStorageService photoStorageService; // Use the interface
  private final UtilisateurService utilisateurService;

  @Autowired
  public SaveUtilisateurPhoto(PhotoStorageService photoStorageService, UtilisateurService utilisateurService) {
    this.photoStorageService = photoStorageService;
    this.utilisateurService = utilisateurService;
  }

  @Override
  public UtilisateurResponseDto savePhoto(Integer id, InputStream photo, String titre) {
    UtilisateurResponseDto utilisateur = utilisateurService.findById(id);
    if (utilisateur == null) {
      throw new InvalidOperationException("Utilisateur non trouvé avec l'ID : " + id, ErrorCodes.UTILISATEUR_NOT_FOUND);
    }

    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo de l'utilisateur", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    // Note: Cannot directly update ResponseDto, need to convert to RequestDto
    // This requires refactoring the strategy pattern to work with the service layer properly
    throw new InvalidOperationException("Photo update for Utilisateur needs refactoring", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
  }
}