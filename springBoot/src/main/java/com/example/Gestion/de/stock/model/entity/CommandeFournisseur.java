package com.example.Gestion.de.stock.model.entity;

import com.example.Gestion.de.stock.model.AbstractEntity;
import com.example.Gestion.de.stock.model.enumElem.EtatCommande;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "commandefournisseur")
public class CommandeFournisseur extends AbstractEntity {

  @Column(name = "code")
  private String code;

  @Column(name = "datecommande")
  private Instant dateCommande;

  @Column(name = "etatcommande")
  @Enumerated(EnumType.STRING)
  private EtatCommande etatCommande;

  @Column(name = "identreprise")
  private Integer idEntreprise;

  @ManyToOne
  @JoinColumn(name = "idfournisseur")
  private Fournisseur fournisseur;

  @OneToMany(mappedBy = "commandeFournisseur", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<LigneCommandeFournisseur> ligneCommandeFournisseurs;


}
