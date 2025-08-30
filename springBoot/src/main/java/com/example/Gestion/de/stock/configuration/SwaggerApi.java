package com.example.Gestion.de.stock.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.example.Gestion.de.stock.utils.Constants.APP_ROOT;

@Configuration
public class SwaggerApi { // Changed class name from SwaggerConfig

    // No need for @EnableSwagger2, SpringDoc handles this automatically

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth"; // This is a common name for JWT scheme

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .info(new Info()
                        .title("Gestion de stock Rest API") // Your title
                        .description("Gestion de stock Api documentation") // Your description
                        .version("1.0") // Your version
                        .contact(new Contact().name("Your Name").email("your.email@example.com")) // Optional: Add your contact info
                        .license(new License().name("Apache 2.0").url("https://springdoc.org"))); // Optional: Add a license
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("Rest API") // Corresponds to your old groupName
                .pathsToMatch("/**") // Your path matching logic
                .packagesToScan("com.example.Gestion.de.stock")
                .build();
    }


}