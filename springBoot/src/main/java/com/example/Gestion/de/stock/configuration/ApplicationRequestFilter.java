package com.example.Gestion.de.stock.configuration;

import com.example.Gestion.de.stock.service.auth.ApplicationUserDetailsService;
import com.example.Gestion.de.stock.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApplicationRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ApplicationUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestURI = request.getRequestURI();
        System.out.println("Processing request: " + requestURI);
        
        // Skip authentication for the authenticate endpoint
        if (requestURI.contains("/authenticate")) {
            System.out.println("Skipping authentication for authenticate endpoint");
            chain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        String userEmail = null;
        String jwt = null;
        String idEntreprise = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            System.out.println("JWT token found in request: " + jwt);
            try {
                userEmail = jwtUtil.extractUsername(jwt);
                idEntreprise = jwtUtil.extractIdEntreprise(jwt);
                System.out.println("Extracted user from JWT: " + userEmail);
            } catch (Exception e) {
                System.out.println("Error extracting claims from JWT: " + e.getMessage());
                // If we can't extract the token, we continue without authentication
                chain.doFilter(request, response);
                return;
            }
        } else {
            System.out.println("No valid JWT token found in request");
        }

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                System.out.println("Loading user details for: " + userEmail);
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                System.out.println("Validating token for user: " + userEmail);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    System.out.println("Token validated successfully for user: " + userEmail);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    usernamePasswordAuthenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                } else {
                    System.out.println("Token validation failed for user: " + userEmail);
                }
            } catch (Exception e) {
                System.out.println("Error loading user or validating token: " + e.getMessage());
                e.printStackTrace();
            }
        }

        MDC.put("idEntreprise", idEntreprise);
        chain.doFilter(request, response);
    }
}