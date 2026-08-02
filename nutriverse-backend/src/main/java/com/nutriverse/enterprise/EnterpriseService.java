package com.nutriverse.enterprise;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class EnterpriseService {

    /**
     * Generates Anonymous Population Health Insights for Corporate Wellness Clients
     */
    public CorporateWellnessSummary getCorporateWellnessSummary(UUID tenantId) {
        return CorporateWellnessSummary.builder()
                .tenantId(tenantId)
                .companyName("Apex Technologies Corp")
                .totalEmployeesEnrolled(4850)
                .averageHealthScore(88)
                .averageDailySteps(9420)
                .topNutrientDeficiencyRisk("Vitamin D (24% of population)")
                .estimatedAnnualHealthcareCostSavingsUsd(BigDecimal.valueOf(345000))
                .monthlyParticipationRatePct(91.5)
                .build();
    }

    /**
     * Generates School Cafeteria Meal Nutrition Compliance Summary
     */
    public SchoolNutritionSummary getSchoolNutritionSummary(UUID schoolTenantId) {
        return SchoolNutritionSummary.builder()
                .schoolTenantId(schoolTenantId)
                .schoolName("St. Jude International Academy")
                .totalStudentsTracked(1200)
                .usdaMealCompliancePct(98.4)
                .averageSugarConsumedGrams(BigDecimal.valueOf(14.2))
                .popularHealthyDishes(List.of("Baked Salmon Bites", "Quinoa Vegetable Salad", "Fresh Apple Slices"))
                .build();
    }

    @lombok.Getter
    @lombok.Builder
    public static class CorporateWellnessSummary {
        private UUID tenantId;
        private String companyName;
        private int totalEmployeesEnrolled;
        private int averageHealthScore;
        private int averageDailySteps;
        private String topNutrientDeficiencyRisk;
        private BigDecimal estimatedAnnualHealthcareCostSavingsUsd;
        private double monthlyParticipationRatePct;
    }

    @lombok.Getter
    @lombok.Builder
    public static class SchoolNutritionSummary {
        private UUID schoolTenantId;
        private String schoolName;
        private int totalStudentsTracked;
        private double usdaMealCompliancePct;
        private BigDecimal averageSugarConsumedGrams;
        private List<String> popularHealthyDishes;
    }
}
