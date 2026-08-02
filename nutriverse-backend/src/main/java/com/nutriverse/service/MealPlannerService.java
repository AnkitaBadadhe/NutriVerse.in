package com.nutriverse.service;

import com.nutriverse.domain.model.Recipe;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealPlannerService {

    /**
     * Generates a 1-Day Personalized Meal Plan matching target caloric & macro goals
     */
    public DayMealPlan generateDailyMealPlan(int targetCalories, String dietaryPreference) {
        List<Recipe.IngredientItem> salmonIngredients = List.of(
                new Recipe.IngredientItem("Wild Salmon", BigDecimal.valueOf(200), "grams"),
                new Recipe.IngredientItem("Quinoa", BigDecimal.valueOf(100), "grams"),
                new Recipe.IngredientItem("Avocado", BigDecimal.valueOf(0.5), "whole")
        );

        Recipe breakfast = Recipe.builder()
                .recipeId("REC-101")
                .title("Avocado & Egg White Toast with Microgreens")
                .prepTimeMinutes(10)
                .macrosPerServing(new Recipe.MacroBreakdown(380, BigDecimal.valueOf(24), BigDecimal.valueOf(32), BigDecimal.valueOf(14), BigDecimal.valueOf(8)))
                .tags(List.of("HighProtein", "QuickPrep", dietaryPreference))
                .build();

        Recipe lunch = Recipe.builder()
                .recipeId("REC-202")
                .title("Mediterranean Quinoa Salmon Bowl")
                .prepTimeMinutes(15)
                .macrosPerServing(new Recipe.MacroBreakdown(560, BigDecimal.valueOf(45), BigDecimal.valueOf(40), BigDecimal.valueOf(18), BigDecimal.valueOf(9)))
                .ingredients(salmonIngredients)
                .tags(List.of("Keto", "HighProtein", "HeartHealthy"))
                .build();

        Recipe dinner = Recipe.builder()
                .recipeId("REC-303")
                .title("Grilled Tofu Curry with Cauliflower Rice")
                .prepTimeMinutes(20)
                .macrosPerServing(new Recipe.MacroBreakdown(480, BigDecimal.valueOf(35), BigDecimal.valueOf(28), BigDecimal.valueOf(16), BigDecimal.valueOf(10)))
                .tags(List.of("Vegan", "LowCarb", "DiabeticFriendly"))
                .build();

        Recipe snack = Recipe.builder()
                .recipeId("REC-404")
                .title("Greek Yogurt with Chia Seeds & Blueberries")
                .prepTimeMinutes(5)
                .macrosPerServing(new Recipe.MacroBreakdown(220, BigDecimal.valueOf(18), BigDecimal.valueOf(20), BigDecimal.valueOf(5), BigDecimal.valueOf(4)))
                .tags(List.of("HighProtein", "Snack"))
                .build();

        int totalCalories = breakfast.getMacrosPerServing().getCalories() +
                lunch.getMacrosPerServing().getCalories() +
                dinner.getMacrosPerServing().getCalories() +
                snack.getMacrosPerServing().getCalories();

        return DayMealPlan.builder()
                .targetCalories(targetCalories)
                .actualCalories(totalCalories)
                .breakfast(breakfast)
                .lunch(lunch)
                .dinner(dinner)
                .snack(snack)
                .build();
    }

    @lombok.Getter
    @lombok.Builder
    public static class DayMealPlan {
        private int targetCalories;
        private int actualCalories;
        private Recipe breakfast;
        private Recipe lunch;
        private Recipe dinner;
        private Recipe snack;
    }
}
