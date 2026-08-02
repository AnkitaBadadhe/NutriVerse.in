package com.nutriverse.web;

import com.nutriverse.domain.model.HealthTwinMetric;
import com.nutriverse.domain.model.UserProfile;
import com.nutriverse.service.NutritionEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/nutrition")
@RequiredArgsConstructor
@Tag(name = "Nutrition & Digital Health Twin", description = "Core nutrition calculation and predictive ML engine APIs")
public class NutritionController {

    private final NutritionEngineService nutritionEngineService;

    @GetMapping("/macros/calculate")
    @Operation(summary = "Calculate Daily Target Macros", description = "Uses Mifflin-St Jeor formula to compute target calories, protein, carbs, and fats")
    public ResponseEntity<NutritionEngineService.DailyMacroTarget> getDailyMacros(
            @RequestParam BigDecimal weightKg,
            @RequestParam BigDecimal heightCm,
            @RequestParam int age,
            @RequestParam String gender) {

        UserProfile mockProfile = UserProfile.builder()
                .id(UUID.randomUUID())
                .gender(gender)
                .heightCm(heightCm)
                .dateOfBirth(LocalDate.now().minusYears(age))
                .build();

        NutritionEngineService.DailyMacroTarget targets = nutritionEngineService.calculateDailyMacros(mockProfile, weightKg);
        return ResponseEntity.ok(targets);
    }

    @PostMapping("/digital-twin/predict")
    @Operation(summary = "Generate Digital Health Twin Trajectories", description = "Predicts 30-day and 90-day weight trajectory and health score metrics")
    public ResponseEntity<HealthTwinMetric> predictHealthTwin(
            @RequestParam BigDecimal currentWeightKg,
            @RequestParam(required = false) BigDecimal targetWeightKg,
            @RequestParam BigDecimal heightCm,
            @RequestParam int age,
            @RequestParam String gender) {

        UserProfile profile = UserProfile.builder()
                .id(UUID.randomUUID())
                .gender(gender)
                .heightCm(heightCm)
                .targetWeightKg(targetWeightKg)
                .dateOfBirth(LocalDate.now().minusYears(age))
                .build();

        HealthTwinMetric metric = nutritionEngineService.generatePredictiveTwin(profile, currentWeightKg);
        return ResponseEntity.ok(metric);
    }
}
