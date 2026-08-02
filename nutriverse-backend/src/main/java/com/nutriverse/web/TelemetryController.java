package com.nutriverse.web;

import com.nutriverse.telemetry.TelemetryMetricsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/telemetry")
@RequiredArgsConstructor
@Tag(name = "Telemetry & AI Cost Analytics", description = "Micrometer Prometheus metrics & AI token cost tracking APIs")
public class TelemetryController {

    private final TelemetryMetricsService telemetryMetricsService;

    @GetMapping("/ai-costs")
    @Operation(summary = "AI Token Cost & Performance Analytics", description = "Returns total AI tokens consumed, dollar cost estimation, average latency, and cache hit rates")
    public ResponseEntity<TelemetryMetricsService.AiCostSummary> getAiCosts() {
        return ResponseEntity.ok(telemetryMetricsService.getAiCostSummary());
    }
}
