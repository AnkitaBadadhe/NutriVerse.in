package com.nutriverse.web;

import com.nutriverse.enterprise.EnterpriseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin/enterprise")
@RequiredArgsConstructor
@Tag(name = "Admin & Enterprise Analytics", description = "Corporate Wellness, School Health Monitors, & Multi-tenant Analytics APIs")
public class AdminEnterpriseController {

    private final EnterpriseService enterpriseService;

    @GetMapping("/corporate-insights")
    @Operation(summary = "Corporate Wellness Population Health Metrics", description = "Returns anonymous aggregate health scores, employee participation rates, and healthcare cost savings")
    public ResponseEntity<EnterpriseService.CorporateWellnessSummary> getCorporateSummary(
            @RequestParam(required = false) UUID tenantId) {

        UUID targetTenant = tenantId != null ? tenantId : UUID.randomUUID();
        return ResponseEntity.ok(enterpriseService.getCorporateWellnessSummary(targetTenant));
    }

    @GetMapping("/school-nutrition")
    @Operation(summary = "School Cafeteria Meal Compliance Metrics", description = "Monitors school lunch nutritional values, sugar consumption, and USDA compliance")
    public ResponseEntity<EnterpriseService.SchoolNutritionSummary> getSchoolSummary(
            @RequestParam(required = false) UUID schoolTenantId) {

        UUID targetSchool = schoolTenantId != null ? schoolTenantId : UUID.randomUUID();
        return ResponseEntity.ok(enterpriseService.getSchoolNutritionSummary(targetSchool));
    }
}
