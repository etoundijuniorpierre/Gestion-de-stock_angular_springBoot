package com.example.Gestion.de.stock.model.entity;

import java.math.BigDecimal;
import java.util.List;

import com.example.Gestion.de.stock.model.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "article")
public class Article extends AbstractEntity {

  @Column(name = "codearticle")
  private String codeArticle;

  @Column(name = "designation")
  private String designation;

  @Column(name = "prixunitaireht")
  private BigDecimal prixUnitaireHt;

  @Column(name = "tauxtva")
  private BigDecimal tauxTva;

  @Column(name = "prixunitairettc")
  private BigDecimal prixUnitaireTtc;

  @Column(name = "photo")
  private String photo;

  @Column(name = "identreprise")
  private Integer idEntreprise;

  @ManyToOne
  @JoinColumn(name = "idcategorie")
  private Categorie categorie;

  @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<LigneVente> ligneVentes;

  @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<LigneCommandeClient> ligneCommandeClients;

  @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<LigneCommandeFournisseur> ligneCommandeFournisseurs;

  @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<MvtStk> mvtStks;

}
