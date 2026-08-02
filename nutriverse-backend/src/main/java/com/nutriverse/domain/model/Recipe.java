package com.nutriverse.domain.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(collection = "recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    private String id;

    private String recipeId;
    private String title;
    private String description;
    private int prepTimeMinutes;
    private int cookTimeMinutes;
    private int servings;
    private List<String> tags; // Keto, HighProtein, GlutenFree, DiabeticFriendly, IndianRegional

    private MacroBreakdown macrosPerServing;
    private List<IngredientItem> ingredients;
    private List<String> instructions;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class MacroBreakdown {
        private int calories;
        private BigDecimal proteinGrams;
        private BigDecimal carbsGrams;
        private BigDecimal fatGrams;
        private BigDecimal fiberGrams;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class IngredientItem {
        private String name;
        private BigDecimal amount;
        private String unit;
    }
}
