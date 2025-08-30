package com.example.Gestion.de.stock.model.entity;

import com.example.Gestion.de.stock.model.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lignevente")
public class LigneVente extends AbstractEntity {

  @ManyToOne
  @JoinColumn(name = "idvente")
  private Ventes vente;

  @ManyToOne
  @JoinColumn(name = "idarticle")
  private Article article;

  @Column(name = "quantite")
  private BigDecimal quantite;

  @Column(name = "prixunitaire")
  private BigDecimal prixUnitaire;

  @Column(name = "identreprise")
  private Integer idEntreprise;

}
