package com.example.Gestion.de.stock.interceptor;

import org.hibernate.resource.jdbc.spi.StatementInspector; // Import the new, focused interface
import org.springframework.util.StringUtils;
import org.slf4j.MDC;
import org.springframework.stereotype.Component; // Optional: If you're using Spring Boot

@Component // If you want Spring to manage this as a bean (recommended for Spring Boot)
public class EntrepriseIdStatementInspector implements StatementInspector {

  @Override
  public String inspect(String sql) { // This is the ONLY method you need to implement
    // Your existing logic to modify the SQL query based on idEntreprise
    if (StringUtils.hasLength(sql) && sql.toLowerCase().startsWith("select")) {
      int fromIndex = sql.toLowerCase().indexOf("from");
      if (fromIndex != -1) {
        String potentialEntityPart = sql.substring(7, fromIndex).trim();
        String entityName = "";

        int spaceIndex = potentialEntityPart.indexOf(" ");
        if (spaceIndex != -1) {
          entityName = potentialEntityPart.substring(0, spaceIndex);
        } else {
          entityName = potentialEntityPart;
        }

        int dotIndex = entityName.indexOf(".");
        if (dotIndex != -1) {
          entityName = entityName.substring(0, dotIndex);
        }

        final String idEntreprise = MDC.get("idEntreprise");

        if (StringUtils.hasLength(entityName)
                && !entityName.toLowerCase().contains("entreprise")
                && !entityName.toLowerCase().contains("roles")
                && StringUtils.hasLength(idEntreprise)) {

          String condition = entityName + ".identreprise = " + idEntreprise;

          if (sql.toLowerCase().contains("where")) {
            sql += " and " + condition;
          } else {
            sql += " where " + condition;
          }
        }
      }
    }
    return sql; // Return the potentially modified SQL string
  }
}