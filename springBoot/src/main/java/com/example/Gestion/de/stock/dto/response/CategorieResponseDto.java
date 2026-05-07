package com.example.Gestion.de.stock.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategorieResponseDto {

    private Integer id;
    private String code;
    private String designation;
    private Integer idEntreprise;
}