package com.example.Gestion.de.stock.model.entity;

import com.example.Gestion.de.stock.model.AbstractEntity;
import com.example.Gestion.de.stock.model.enumElem.SourceMvtStk;
import com.example.Gestion.de.stock.model.enumElem.TypeMvtStk;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "mvtstk")
public class MvtStk extends AbstractEntity {

  @Column(name = "datemvt")
  private Instant dateMvt;

  @Column(name = "quantite")
  private BigDecimal quantite;

  @ManyToOne
  @JoinColumn(name = "idarticle")
  private Article article;

  @Column(name = "typemvt")
  @Enumerated(EnumType.STRING)
  private TypeMvtStk typeMvt;

  @Column(name = "sourcemvt")
  @Enumerated(EnumType.STRING)
  private SourceMvtStk sourceMvt;

  @Column(name = "identreprise")
  private Integer idEntreprise;
}
