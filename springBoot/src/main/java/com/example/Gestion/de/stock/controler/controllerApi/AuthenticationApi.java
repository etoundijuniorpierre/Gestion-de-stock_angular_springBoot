package com.example.Gestion.de.stock.controler.controllerApi;


import com.example.Gestion.de.stock.dto.auth.AuthenticationRequest;
import com.example.Gestion.de.stock.dto.auth.AuthenticationResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;
//import static com.example.Gestion.de.stock.utils.Constants.AUTHENTICATION_ENDPOINT;

@Tag(name = "authentification", description = "API pour les opérations d'authentification")
@RequestMapping(APP_ROOT)
public interface AuthenticationApi {
    @PostMapping( "/authenticate")
    ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request);

    @PostMapping("/logout")
    ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response);
}