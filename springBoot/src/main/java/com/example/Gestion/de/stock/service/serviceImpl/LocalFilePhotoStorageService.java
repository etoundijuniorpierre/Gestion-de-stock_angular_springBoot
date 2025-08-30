package com.example.Gestion.de.stock.service.serviceImpl;// package com.example.Gestion.de.stock.service.serviceImpl; (Adjust package as needed)

import com.example.Gestion.de.stock.service.PhotoStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service // Still a Spring service
public class LocalFilePhotoStorageService implements PhotoStorageService { // Implements the new local storage interface

    // The directory where photos will be saved locally
    @Value("${photo.static.upload.subdirectory:static/uploads}")
    private String staticUploadSubdirectory;

    // The getRandomPhotoUrl method and Unsplash-related fields are REMOVED from here.
    // They belong in UnsplashApiServiceImpl now.

    @Override
    public String savePhoto(InputStream photo, String title) {
        if (photo == null) {
            System.err.println("Input stream for photo is null. Cannot save photo.");
            return null;
        }

        try {
            Path currentWorkingDir = Paths.get("").toAbsolutePath();
            Path uploadPath = currentWorkingDir.resolve(staticUploadSubdirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String sanitizedTitle = title.replaceAll("[^a-zA-Z0-9.-]", "_");
            String fileName = UUID.randomUUID().toString() + "_" + sanitizedTitle + ".jpg";

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(photo, filePath, StandardCopyOption.REPLACE_EXISTING);

            System.out.println("Photo saved successfully to: " + filePath.toAbsolutePath());

            return "/" + staticUploadSubdirectory + "/" + fileName;

        } catch (IOException e) {
            System.err.println("Error saving photo: " + e.getMessage());
            e.printStackTrace();
            return null;
        } finally {
            try {
                if (photo != null) {
                    photo.close();
                }
            } catch (IOException e) {
                System.err.println("Error closing InputStream: " + e.getMessage());
            }
        }
    }

    // UnsplashResponse and Urls internal classes are REMOVED from here.
    // They belong in UnsplashApiServiceImpl now.
}