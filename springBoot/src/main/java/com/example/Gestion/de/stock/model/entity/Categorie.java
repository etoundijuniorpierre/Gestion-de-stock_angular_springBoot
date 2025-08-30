package com.example.Gestion.de.stock.model.entity;

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
@Table(name = "category")
public class Categorie extends AbstractEntity {

  @Column(name = "code")
  private String code;

  @Column(name = "designation")
  private String designation;

  @Column(name = "identreprise")
  private Integer idEntreprise;

  @OneToMany(mappedBy = "categorie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<Article> articles;

}
