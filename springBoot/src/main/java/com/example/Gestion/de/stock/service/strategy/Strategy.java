package com.example.Gestion.de.stock.service.strategy;

import java.io.InputStream;

public interface Strategy<T> {

  T savePhoto(Integer id, InputStream photo, String titre); // Removed throws FlickrException

}