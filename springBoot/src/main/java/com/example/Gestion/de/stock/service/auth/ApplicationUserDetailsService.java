package com.example.Gestion.de.stock.service.auth;

import com.example.Gestion.de.stock.model.entity.Utilisateur;
import com.example.Gestion.de.stock.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    public ApplicationUserDetailsService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user by username: " + username);

        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("utilisateur introuvable avec l'email : " + username));

        // Check if the user has roles
        if (utilisateur.getRoles() == null || utilisateur.getRoles().isEmpty()) {
            System.out.println("No roles found for user: " + username);
            throw new UsernameNotFoundException("Aucun rôle trouvé pour l'utilisateur : " + username);
        }

        List<SimpleGrantedAuthority> authorities = utilisateur.getRoles().stream()
                .map(role -> {
                    System.out.println("Adding role: " + role.getRoleName() + " for user: " + username);
                    return new SimpleGrantedAuthority(role.getRoleName());
                })
                .collect(Collectors.toList());

        System.out.println("Loading user: " + username);
        System.out.println("Password from DB: " + utilisateur.getMotDePasse());
        System.out.println("Number of roles: " + authorities.size());

        User user = new User(
                utilisateur.getEmail(),
                utilisateur.getMotDePasse(),
                authorities
        );
        
        System.out.println("Created User object with username: " + user.getUsername());
        
        return user;
    }
}