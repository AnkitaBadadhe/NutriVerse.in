package com.nutriverse.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpringAiOrchestratorService {

    private final ChatModel chatModel;

    /**
     * Executes RAG Clinical AI Nutrition Chat with Safety Guardrails
     */
    public String generateClinicalAiResponse(String userPrompt, String profileContext) {
        String systemMessage = """
                You are NutriVerse AI, an elite clinical nutritionist and health companion.
                Profile Context: %s
                Provide evidence-based, empathetic, and actionable nutritional advice.
                Alert the user immediately if any requested food contraindicates their medical conditions or allergies.
                """.formatted(profileContext);

        Prompt prompt = new Prompt(systemMessage + "\nUser Question: " + userPrompt);
        return chatModel.call(prompt).getResult().getOutput().getContent();
    }

    /**
     * Simulates Computer Vision Food Scan Analysis
     */
    public FoodVisionResult analyzeMealImage(byte[] imageBytes) {
        return FoodVisionResult.builder()
                .dishName("Salmon Quinoa Grain Bowl")
                .confidenceScore(0.96)
                .estimatedWeightGrams(350)
                .calories(520)
                .proteinGrams(BigDecimal.valueOf(42.5))
                .carbsGrams(BigDecimal.valueOf(38.0))
                .fatGrams(BigDecimal.valueOf(18.0))
                .detectedIngredients(List.of("Wild Salmon", "Quinoa", "Avocado", "Cherry Tomatoes", "Olive Oil"))
                .build();
    }

    /**
     * Simulates Pantry & Refrigerator Photo Scan
     */
    public PantryScanResult scanFridgePantry(byte[] imageBytes) {
        return PantryScanResult.builder()
                .detectedItems(List.of("Eggs", "Spinach", "Greek Yogurt", "Almond Milk", "Bell Peppers"))
                .suggestedRecipeName("Spinach & Bell Pepper Omelette")
                .missingIngredients(List.of("Olive Oil"))
                .build();
    }

    /**
     * Simulates Medical Report OCR Parsing
     */
    public MedicalReportResult parseMedicalReport(byte[] pdfBytes) {
        return MedicalReportResult.builder()
                .hba1c(BigDecimal.valueOf(5.6))
                .totalCholesterol(BigDecimal.valueOf(185))
                .vitaminD(BigDecimal.valueOf(22.5)) // Low - needs supplement
                .summary("Vitamin D insufficiency detected. Dietary target adjusted to increase fortified foods and daily sunlight exposure.")
                .recommendedSupplements(List.of("Vitamin D3 2000 IU Daily", "Omega-3 Fish Oil"))
                .build();
    }

    @lombok.Getter
    @lombok.Builder
    public static class FoodVisionResult {
        private String dishName;
        private double confidenceScore;
        private int estimatedWeightGrams;
        private int calories;
        private BigDecimal proteinGrams;
        private BigDecimal carbsGrams;
        private BigDecimal fatGrams;
        private List<String> detectedIngredients;
    }

    @lombok.Getter
    @lombok.Builder
    public static class PantryScanResult {
        private List<String> detectedItems;
        private String suggestedRecipeName;
        private List<String> missingIngredients;
    }

    @lombok.Getter
    @lombok.Builder
    public static class MedicalReportResult {
        private BigDecimal hba1c;
        private BigDecimal totalCholesterol;
        private BigDecimal vitaminD;
        private String summary;
        private List<String> recommendedSupplements;
    }
}
