package com.nutriverse.web;

import com.nutriverse.ai.SpringAiOrchestratorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
@Tag(name = "AI & Vision Modules", description = "Spring AI Chat, Computer Vision Meal Scanner, Pantry AI & Medical Report OCR APIs")
public class AiModuleController {

    private final SpringAiOrchestratorService aiOrchestratorService;

    @PostMapping("/chat")
    @Operation(summary = "AI Clinical Nutritionist Chat", description = "Executes RAG context retrieval and Spring AI multi-agent synthesis")
    public ResponseEntity<String> chat(
            @RequestParam String prompt,
            @RequestParam(defaultValue = "Adult Parent, No Known Allergies") String profileContext) {

        String response = aiOrchestratorService.generateClinicalAiResponse(prompt, profileContext);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/vision/scan-meal")
    @Operation(summary = "Scan Meal Photo for Macro Detection", description = "Analyzes dish image, estimates portion weight and macro breakdown")
    public ResponseEntity<SpringAiOrchestratorService.FoodVisionResult> scanMeal(
            @RequestParam("file") MultipartFile file) throws IOException {

        SpringAiOrchestratorService.FoodVisionResult result = aiOrchestratorService.analyzeMealImage(file.getBytes());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/vision/scan-fridge")
    @Operation(summary = "Scan Refrigerator & Pantry Photo", description = "Detects available ingredients and generates meal recipes")
    public ResponseEntity<SpringAiOrchestratorService.PantryScanResult> scanFridge(
            @RequestParam("file") MultipartFile file) throws IOException {

        SpringAiOrchestratorService.PantryScanResult result = aiOrchestratorService.scanFridgePantry(file.getBytes());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/medical/scan-report")
    @Operation(summary = "Scan Medical Blood Lab Report", description = "OCR & NLP parser extracting lipid and sugar markers to calibrate diet")
    public ResponseEntity<SpringAiOrchestratorService.MedicalReportResult> scanMedicalReport(
            @RequestParam("file") MultipartFile file) throws IOException {

        SpringAiOrchestratorService.MedicalReportResult result = aiOrchestratorService.parseMedicalReport(file.getBytes());
        return ResponseEntity.ok(result);
    }
}
