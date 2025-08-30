package com.example.Gestion.de.stock.service.serviceImpl;// package com.example.Gestion.de.stock.service.serviceImpl; (Adjust package as needed)

import com.example.Gestion.de.stock.service.UnsplashApiService; // Implement the new interface
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.Getter;
import lombok.Setter;

@Service
public class UnsplashApiServiceImpl implements UnsplashApiService {

    @Value("${unsplash.apiKey}")
    private String apiKey;

    private static final String UNSPLASH_API = "https://api.unsplash.com";

    @Override
    public String getRandomPhotoUrl(String query) {
        RestTemplate restTemplate = new RestTemplate();
        String url = UNSPLASH_API + "/photos/random?query=" + query + "&client_id=" + apiKey;

        try {
            UnsplashResponse response = restTemplate.getForObject(url, UnsplashResponse.class);
            return response != null ? response.getUrls().getRegular() : null;
        } catch (Exception e) {
            System.err.println("Error fetching random photo from Unsplash: " + e.getMessage());
            return null;
        }
    }

    // Internal classes for deserializing the Unsplash response
    @Setter
    @Getter
    private static class UnsplashResponse {
        private Urls urls;
    }

    @Setter
    @Getter
    private static class Urls {
        private String regular;
    }
}