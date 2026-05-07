package com.example.Gestion.de.stock.dto.mapper;

import com.example.Gestion.de.stock.dto.request.MvtStkRequestDto;
import com.example.Gestion.de.stock.dto.response.MvtStkResponseDto;
import com.example.Gestion.de.stock.model.entity.MvtStk;

public class MvtStkMapper {

    public static MvtStk toEntity(MvtStkRequestDto dto) {
        if (dto == null) {
            return null;
        }
        
        MvtStk mvtStk = new MvtStk();
        mvtStk.setDateMvt(dto.getDateMvt());
        mvtStk.setQuantite(dto.getQuantite());
        // Note: Article is set in the service layer after fetching from DB
        mvtStk.setTypeMvt(dto.getTypeMvt());
        mvtStk.setSourceMvt(dto.getSourceMvt());
        mvtStk.setIdEntreprise(dto.getIdEntreprise());
        
        return mvtStk;
    }

    public static MvtStkResponseDto fromEntity(MvtStk mvtStk) {
        if (mvtStk == null) {
            return null;
        }
        
        return MvtStkResponseDto.builder()
                .id(mvtStk.getId())
                .dateMvt(mvtStk.getDateMvt())
                .quantite(mvtStk.getQuantite())
                .article(ArticleMapper.fromEntity(mvtStk.getArticle()))
                .typeMvt(mvtStk.getTypeMvt())
                .sourceMvt(mvtStk.getSourceMvt())
                .idEntreprise(mvtStk.getIdEntreprise())
                .build();
    }
}