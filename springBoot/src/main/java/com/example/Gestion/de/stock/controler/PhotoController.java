package com.example.Gestion.de.stock.controler;// package com.example.Gestion.de.stock.controler; (Adjust package as needed)

import com.example.Gestion.de.stock.controler.controllerApi.PhotoApi; // Ensure correct import
import com.example.Gestion.de.stock.service.strategy.StrategyPhotoContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
// import com.flickr4java.flickr.FlickrException; // Remove if not used

@RestController
public class PhotoController implements PhotoApi {

  private final StrategyPhotoContext strategyPhotoContext;

  @Autowired
  public PhotoController(StrategyPhotoContext strategyPhotoContext) {
    this.strategyPhotoContext = strategyPhotoContext;
  }

  @Override
  public Object savePhoto(String context, Integer id, MultipartFile photo, String title) throws IOException { // Removed FlickrException
    return strategyPhotoContext.savePhoto(context, id, photo.getInputStream(), title);
  }
}