package com.nutriverse.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/nutrition/hydration")
@Tag(name = "Hydration & Circadian Fasting APIs", description = "Water intake logging, circadian intermittent fasting, and electrolyte balance REST APIs")
public class HydrationCircadianController {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WaterLogRequest {
        private int amountMl;
        private String note;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WaterLogResponse {
        private String id;
        private int amountMl;
        private String timestamp;
        private int totalDailyLoggedMl;
        private int dailyTargetMl;
        private int hydrationPercentage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FastingStatusResponse {
        private String protocolName;
        private int fastingHours;
        private int eatingHours;
        private boolean isActive;
        private long secondsElapsed;
        private String metabolicStageTitle;
        private String metabolicStageDescription;
        private String icmrElectrolyteTip;
    }

    @PostMapping("/log")
    @Operation(summary = "Log Water Intake", description = "Logs water or fluid intake in mL and calculates updated daily hydration status")
    public ResponseEntity<WaterLogResponse> logWater(@RequestBody WaterLogRequest request) {
        int amount = request.getAmountMl() > 0 ? request.getAmountMl() : 250;
        int target = 3000;
        int totalLogged = 1250 + amount;
        int percent = Math.min(100, (totalLogged * 100) / target);

        WaterLogResponse response = WaterLogResponse.builder()
                .id(UUID.randomUUID().toString())
                .amountMl(amount)
                .timestamp(LocalDateTime.now().toString())
                .totalDailyLoggedMl(totalLogged)
                .dailyTargetMl(target)
                .hydrationPercentage(percent)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/fasting/status")
    @Operation(summary = "Get Intermittent Fasting Metabolic Status", description = "Returns active circadian fasting clock metrics and metabolic stage details")
    public ResponseEntity<FastingStatusResponse> getFastingStatus(
            @RequestParam(defaultValue = "16:8 LeanGains") String protocol,
            @RequestParam(defaultValue = "51900") long elapsedSeconds) {

        double hours = elapsedSeconds / 3600.0;
        String stageTitle = "Autophagy & Cellular Repair Active";
        String stageDesc = "Damaged cellular proteins are cleared & mitochondrial biogenesis is triggered!";

        if (hours < 4) {
            stageTitle = "Anabolic Digestion Stage";
            stageDesc = "Blood sugar is being normalized and glucose stored as glycogen.";
        } else if (hours < 8) {
            stageTitle = "Insulin Drop & Glycogen Depletion";
            stageDesc = "Circulating insulin levels drop, enabling fat stores to be unlocked.";
        } else if (hours < 12) {
            stageTitle = "Ketosis & Accelerated Fat Oxidation";
            stageDesc = "Glycogen is depleted and liver synthesizes ketone bodies for energy.";
        }

        FastingStatusResponse response = FastingStatusResponse.builder()
                .protocolName(protocol)
                .fastingHours(16)
                .eatingHours(8)
                .isActive(true)
                .secondsElapsed(elapsedSeconds)
                .metabolicStageTitle(stageTitle)
                .metabolicStageDescription(stageDesc)
                .icmrElectrolyteTip("During 14+ hour fasting windows, sip tender coconut water or lemon water with Himalayan pink salt to maintain electrolyte equilibrium.")
                .build();

        return ResponseEntity.ok(response);
    }
}
