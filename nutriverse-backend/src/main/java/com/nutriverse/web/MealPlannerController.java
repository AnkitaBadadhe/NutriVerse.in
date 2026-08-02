package com.nutriverse.web;

import com.nutriverse.service.MealPlannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nutrition/meal-planner")
@RequiredArgsConstructor
@Tag(name = "Meal Planner & Recipe Engine", description = "Personalized meal plan generation REST APIs")
public class MealPlannerController {

    private final MealPlannerService mealPlannerService;

    @GetMapping("/generate")
    @Operation(summary = "Generate Daily Personalized Meal Plan", description = "Generates breakfast, lunch, dinner, and snack recipes tuned to calorie targets and dietary preferences")
    public ResponseEntity<MealPlannerService.DayMealPlan> generatePlan(
            @RequestParam(defaultValue = "2000") int targetCalories,
            @RequestParam(defaultValue = "HIGH_PROTEIN") String preference) {

        MealPlannerService.DayMealPlan plan = mealPlannerService.generateDailyMealPlan(targetCalories, preference);
        return ResponseEntity.ok(plan);
    }
}
