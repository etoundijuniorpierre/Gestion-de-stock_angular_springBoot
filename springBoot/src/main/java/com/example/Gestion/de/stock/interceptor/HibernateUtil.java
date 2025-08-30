package com.example.Gestion.de.stock.interceptor;

import lombok.Getter;
import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.boot.spi.MetadataImplementor;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.SessionFactory;

public class HibernateUtil {

    @Getter
    private static SessionFactory sessionFactory;

    static {
        try {
            ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                    .configure("hibernate.cfg.xml") // Your Hibernate configuration XML
                    .build();

            MetadataSources metadataSources = new MetadataSources(serviceRegistry);
            // Add your annotated entity classes or mapping resources here
            // metadataSources.addAnnotatedClass(YourEntity.class);

            MetadataImplementor metadata = (MetadataImplementor) metadataSources.buildMetadata();



        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

}