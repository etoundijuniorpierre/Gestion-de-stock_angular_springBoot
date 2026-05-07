package com.example.Gestion.de.stock.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategorieRequestDto {

    private String code;
    private String designation;
    private Integer idEntreprise;
}