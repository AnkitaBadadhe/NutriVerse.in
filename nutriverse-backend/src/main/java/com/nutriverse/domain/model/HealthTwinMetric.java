package com.nutriverse.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "health_twin_metrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthTwinMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "profile_id", nullable = false)
    private UUID profileId;

    @Column(name = "weight_kg", nullable = false, precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "body_fat_pct", precision = 4, scale = 2)
    private BigDecimal bodyFatPct;

    @Column(name = "muscle_mass_kg", precision = 5, scale = 2)
    private BigDecimal muscleMassKg;

    @Column(name = "hydration_pct", precision = 4, scale = 2)
    private BigDecimal hydrationPct;

    @Column(name = "health_score")
    private Integer healthScore;

    @Column(name = "predicted_weight_30d", precision = 5, scale = 2)
    private BigDecimal predictedWeight30d;

    @Column(name = "predicted_weight_90d", precision = 5, scale = 2)
    private BigDecimal predictedWeight90d;

    @Column(name = "recorded_at", nullable = false, updatable = false)
    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        this.recordedAt = LocalDateTime.now();
    }
}
