package com.example.Gestion.de.stock.dto;

import com.example.Gestion.de.stock.model.entity.Categorie;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CategorieDto {
    private Integer id;

    private String code;

    private String designation;

    private Integer idEntreprise;

    @JsonIgnore
    private List<ArticleDto> articles;

    public static CategorieDto fromEntity(Categorie categorie) {
        if (categorie == null) {
            return null;
        }

        return CategorieDto.builder()
                .id(categorie.getId())
                .code(categorie.getCode())
                .designation(categorie.getDesignation())
                .idEntreprise(categorie.getIdEntreprise())
                .build();

    }

    public static Categorie toEntity(CategorieDto categorieDto) {
        if (categorieDto == null) {
            return null;
        }

        Categorie categorie = new Categorie();
            categorie.setCode(categorieDto.getCode());
            categorie.setDesignation(categorieDto.getDesignation());
            categorie.setDesignation(categorieDto.getDesignation());
            return categorie;
    }
}