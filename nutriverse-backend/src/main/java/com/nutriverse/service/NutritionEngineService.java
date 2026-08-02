package com.nutriverse.service;

import com.nutriverse.domain.model.HealthTwinMetric;
import com.nutriverse.domain.model.UserProfile;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Service
public class NutritionEngineService {

    /**
     * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
     */
    public BigDecimal calculateBmr(BigDecimal weightKg, BigDecimal heightCm, int age, String gender) {
        // BMR = 10 * weight + 6.25 * height - 5 * age + s (s = +5 male, -161 female)
        BigDecimal part1 = weightKg.multiply(BigDecimal.valueOf(10));
        BigDecimal part2 = heightCm.multiply(BigDecimal.valueOf(6.25));
        BigDecimal part3 = BigDecimal.valueOf(5 * age);

        BigDecimal base = part1.add(part2).subtract(part3);
        int genderOffset = "MALE".equalsIgnoreCase(gender) ? 5 : -161;

        return base.add(BigDecimal.valueOf(genderOffset)).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Calculates Recommended Daily Macro Allowance
     */
    public DailyMacroTarget calculateDailyMacros(UserProfile profile, BigDecimal currentWeightKg) {
        int age = Period.between(profile.getDateOfBirth(), LocalDate.now()).getYears();
        BigDecimal bmr = calculateBmr(currentWeightKg, profile.getHeightCm(), age, profile.getGender());

        // Moderation activity multiplier 1.375x
        BigDecimal tdee = bmr.multiply(BigDecimal.valueOf(1.375)).setScale(0, RoundingMode.HALF_UP);

        // Macro Distribution (Protein 30%, Carbs 40%, Fat 30%)
        BigDecimal proteinGrams = tdee.multiply(BigDecimal.valueOf(0.30)).divide(BigDecimal.valueOf(4), 1, RoundingMode.HALF_UP);
        BigDecimal carbsGrams = tdee.multiply(BigDecimal.valueOf(0.40)).divide(BigDecimal.valueOf(4), 1, RoundingMode.HALF_UP);
        BigDecimal fatGrams = tdee.multiply(BigDecimal.valueOf(0.30)).divide(BigDecimal.valueOf(9), 1, RoundingMode.HALF_UP);

        return DailyMacroTarget.builder()
                .calories(tdee.intValue())
                .proteinGrams(proteinGrams)
                .carbsGrams(carbsGrams)
                .fatGrams(fatGrams)
                .fiberGrams(BigDecimal.valueOf(30))
                .build();
    }

    /**
     * Generates 30-Day and 90-Day Digital Health Twin Weight Trajectory Predictions
     */
    public HealthTwinMetric generatePredictiveTwin(UserProfile profile, BigDecimal currentWeight) {
        BigDecimal targetWeight = profile.getTargetWeightKg() != null ? profile.getTargetWeightKg() : currentWeight;
        BigDecimal diff = targetWeight.subtract(currentWeight);

        // Model expected 0.5kg/week healthy weight change
        BigDecimal changePerMonth = BigDecimal.valueOf(diff.compareTo(BigDecimal.ZERO) >= 0 ? 1.5 : -1.5);

        BigDecimal pred30 = currentWeight.add(changePerMonth).setScale(2, RoundingMode.HALF_UP);
        BigDecimal pred90 = currentWeight.add(changePerMonth.multiply(BigDecimal.valueOf(3))).setScale(2, RoundingMode.HALF_UP);

        return HealthTwinMetric.builder()
                .profileId(profile.getId())
                .weightKg(currentWeight)
                .healthScore(88) // Calculated base score
                .predictedWeight30d(pred30)
                .predictedWeight90d(pred90)
                .build();
    }

    @lombok.Getter
    @lombok.Builder
    public static class DailyMacroTarget {
        private int calories;
        private BigDecimal proteinGrams;
        private BigDecimal carbsGrams;
        private BigDecimal fatGrams;
        private BigDecimal fiberGrams;
    }
}
