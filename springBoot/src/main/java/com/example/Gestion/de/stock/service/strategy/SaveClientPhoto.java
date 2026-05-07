package com.example.Gestion.de.stock.service.strategy;

import com.example.Gestion.de.stock.dto.response.ClientResponseDto;
import com.example.Gestion.de.stock.exception.ErrorCodes;
import com.example.Gestion.de.stock.exception.InvalidOperationException;
import com.example.Gestion.de.stock.service.ClientService;
import com.example.Gestion.de.stock.service.PhotoStorageService;
import com.flickr4java.flickr.FlickrException;
import java.io.InputStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service("clientStrategy")
@Slf4j
public class SaveClientPhoto implements Strategy<ClientResponseDto> {

  private final PhotoStorageService photoStorageService;
  private final ClientService clientService;

  @Autowired
  public SaveClientPhoto(PhotoStorageService photoStorageService, ClientService clientService) {
    this.photoStorageService = photoStorageService;
    this.clientService = clientService;
  }

  @Override
  public ClientResponseDto savePhoto(Integer id, InputStream photo, String titre) {
    ClientResponseDto client = clientService.findById(id);
    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo du client", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    // Note: Cannot directly update ResponseDto, need to convert to RequestDto
    throw new InvalidOperationException("Photo update for Client needs refactoring", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
  }
}
