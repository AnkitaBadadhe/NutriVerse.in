package com.nutriverse.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "practitioners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Practitioner {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String specialty; // Clinical Nutritionist, Endocrinologist, Pediatric Dietitian, Fitness Coach

    @Column(nullable = false)
    private String licenseNumber;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating; // e.g., 4.95

    @Column(name = "hourly_rate_usd", precision = 6, scale = 2)
    private BigDecimal hourlyRateUsd;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;
}
