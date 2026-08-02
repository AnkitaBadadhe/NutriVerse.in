package com.nutriverse.service;

import com.nutriverse.domain.model.HealthTwinMetric;
import com.nutriverse.domain.model.UserProfile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class NutritionEngineServiceTest {

    private NutritionEngineService nutritionEngineService;

    @BeforeEach
    void setUp() {
        nutritionEngineService = new NutritionEngineService();
    }

    @Test
    @DisplayName("Should accurately calculate Male BMR using Mifflin-St Jeor Formula")
    void testCalculateMaleBmr() {
        BigDecimal weight = BigDecimal.valueOf(70.0);
        BigDecimal height = BigDecimal.valueOf(175.0);
        int age = 30;

        BigDecimal bmr = nutritionEngineService.calculateBmr(weight, height, age, "MALE");
        // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
        assertEquals(BigDecimal.valueOf(1648.75), bmr);
    }

    @Test
    @DisplayName("Should generate 30-day and 90-day Digital Health Twin weight loss predictions")
    void testHealthTwinWeightLossPrediction() {
        UserProfile profile = UserProfile.builder()
                .id(UUID.randomUUID())
                .gender("FEMALE")
                .heightCm(BigDecimal.valueOf(165))
                .targetWeightKg(BigDecimal.valueOf(60.0))
                .dateOfBirth(LocalDate.now().minusYears(28))
                .build();

        BigDecimal currentWeight = BigDecimal.valueOf(65.0);

        HealthTwinMetric metric = nutritionEngineService.generatePredictiveTwin(profile, currentWeight);

        assertNotNull(metric);
        assertEquals(BigDecimal.valueOf(63.50), metric.getPredictedWeight30d());
        assertEquals(BigDecimal.valueOf(60.50), metric.getPredictedWeight90d());
        assertEquals(88, metric.getHealthScore());
    }
}
