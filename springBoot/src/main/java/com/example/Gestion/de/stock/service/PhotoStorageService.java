package com.example.Gestion.de.stock.service;

import java.io.InputStream;

public interface PhotoStorageService {
    String savePhoto(InputStream photo, String title);
}