package com.example.Gestion.de.stock.service.strategy;

import com.example.Gestion.de.stock.dto.ClientDto;
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
public class SaveClientPhoto implements Strategy<ClientDto> {

  private final PhotoStorageService photoStorageService;
  private final ClientService clientService;

  @Autowired
  public SaveClientPhoto(PhotoStorageService photoStorageService, ClientService clientService) {
    this.photoStorageService = photoStorageService;
    this.clientService = clientService;
  }

  @Override
  public ClientDto savePhoto(Integer id, InputStream photo, String titre) {
    ClientDto client = clientService.findById(id);
    String urlPhoto = photoStorageService.savePhoto(photo, titre);
    if (!StringUtils.hasLength(urlPhoto)) {
      throw new InvalidOperationException("Erreur lors de l'enregistrement de photo du client", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
    }
    client.setPhoto(urlPhoto);
    return clientService.save(client);
  }
}
