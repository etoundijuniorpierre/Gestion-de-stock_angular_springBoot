package com.example.Gestion.de.stock.dto.response;

import com.example.Gestion.de.stock.model.entity.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RolesResponseDto {

  private Integer id;

  private String roleName;

  @JsonIgnore
  private UtilisateurResponseDto utilisateur;

  public static RolesResponseDto fromEntity(Roles roles) {
    if (roles == null) {
      return null;
    }
    return RolesResponseDto.builder()
        .id(roles.getId())
        .roleName(roles.getRoleName())
        .build();
  }

  public static Roles toEntity(RolesResponseDto dto) {
    if (dto == null) {
      return null;
    }
    Roles roles = new Roles();
    roles.setId(dto.getId());
    roles.setRoleName(dto.getRoleName());
    // Note: L'utilisateur sera assigné séparément dans le service
    return roles;
  }

}