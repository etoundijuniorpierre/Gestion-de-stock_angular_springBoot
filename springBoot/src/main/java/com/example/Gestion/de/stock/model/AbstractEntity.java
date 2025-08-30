package com.example.Gestion.de.stock.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;

@Data
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This is crucial for PostgreSQL auto-increment
    private Integer id;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private Instant creationDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @PrePersist
    public void prePersist() {
        this.creationDate = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedDate = Instant.now();
    }
}