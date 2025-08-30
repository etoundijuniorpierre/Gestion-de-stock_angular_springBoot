package com.example.Gestion.de.stock.interceptor;

import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HibernateConfiguration {

    private final ObjectProvider<StatementInspector> statementInspectorProvider;

    // Spring will automatically inject your MyStatementInspector bean here
    public HibernateConfiguration(ObjectProvider<StatementInspector> statementInspectorProvider) {
        this.statementInspectorProvider = statementInspectorProvider;
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer() {
        return hibernateProperties ->
                // If an StatementInspector bean is found, register it with Hibernate
                statementInspectorProvider.ifAvailable(inspector ->
                        hibernateProperties.put("hibernate.session_factory.statement_inspector", inspector)
                );
    }
}