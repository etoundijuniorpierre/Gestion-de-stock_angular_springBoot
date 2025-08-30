package com.example.Gestion.de.stock.controler.controllerApi;// package com.example.Gestion.de.stock.controler.Api; (Adjust package as needed)

import io.swagger.v3.oas.annotations.tags.Tag; // Ensure this import is correct
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

// Assuming APP_ROOT is defined in a Constants class
import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT; // Adjust path to your Constants file

@Tag(name = "Gestion des Photos", description = "API pour le téléchargement et la gestion des photos des entités") // Corrected Tag
@RequestMapping(APP_ROOT + "/photo")
public interface PhotoApi {

  @PostMapping("/save/{id}/{title}/{context}")
  Object savePhoto(@PathVariable("context") String context, @PathVariable("id") Integer id,
                   @RequestPart("file") MultipartFile photo, @PathVariable("title") String title) throws IOException; // Removed FlickrException
}