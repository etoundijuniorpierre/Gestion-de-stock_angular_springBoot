package com.example.Gestion.de.stock.controler;

import com.example.Gestion.de.stock.controler.controllerApi.AuthenticationApi;
import com.example.Gestion.de.stock.dto.auth.AuthenticationRequest;
import com.example.Gestion.de.stock.dto.auth.AuthenticationResponse;
import com.example.Gestion.de.stock.service.auth.ApplicationUserDetailsService;
import com.example.Gestion.de.stock.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthenticationController implements AuthenticationApi {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private ApplicationUserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
    System.out.println("Attempting authentication for user: " + request.getLogin());
    System.out.println("Password provided: " + request.getPassword());
    
    try {
      // Authenticate the user credentials
      UsernamePasswordAuthenticationToken authToken = 
          new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword());
      
      System.out.println("Created authentication token for: " + request.getLogin());
      
      Authentication authentication = authenticationManager.authenticate(authToken);
      
      System.out.println("Authentication successful for user: " + request.getLogin());
      System.out.println("Authentication principal: " + authentication.getPrincipal());
      System.out.println("Authentication credentials: " + authentication.getCredentials());
      System.out.println("Authentication authorities: " + authentication.getAuthorities());
    } catch (AuthenticationException e) {
      // Log the authentication error
      System.out.println("Authentication failed for user: " + request.getLogin());
      System.out.println("Authentication exception: " + e.getClass().getName());
      System.out.println("Error message: " + e.getMessage());
      throw e; // Re-throw to let Spring Security handle it
    } catch (Exception e) {
      // Log any other error
      System.out.println("Unexpected error during authentication for user: " + request.getLogin());
      System.out.println("Error: " + e.getMessage());
      e.printStackTrace();
      throw e; // Re-throw to let Spring Security handle it
    }
    
    // Load user details
    final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
    System.out.println("User details loaded for: " + userDetails.getUsername());

    // Generate JWT token
    final String jwt = jwtUtil.generateToken(userDetails);
    System.out.println("JWT token generated: " + jwt);

    return ResponseEntity.ok(AuthenticationResponse.builder().accessToken(jwt).build());
  }

  @Override
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    SecurityContextHolder.clearContext();
    return ResponseEntity.ok().body("Logged out successfully");
  }
}