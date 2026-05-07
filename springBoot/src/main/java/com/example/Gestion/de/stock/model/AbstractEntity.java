package com.example.Gestion.de.stock.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This is crucial for PostgreSQL auto-increment
    private Integer id;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDate creationDate;

    @Column(name = "last_modified_date")
    private LocalDate lastModifiedDate;

    @PrePersist
    public void prePersist() {
        this.creationDate = LocalDate.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedDate = LocalDate.now();
    }
}