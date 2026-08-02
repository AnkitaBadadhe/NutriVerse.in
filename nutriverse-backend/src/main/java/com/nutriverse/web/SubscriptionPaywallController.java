package com.nutriverse.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/nutrition/subscription")
@CrossOrigin(origins = "*")
public class SubscriptionPaywallController {

    @GetMapping("/plans")
    public ResponseEntity<Map<String, Object>> getSubscriptionPlans() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "SUCCESS");
        response.put("currency", "INR");

        List<Map<String, Object>> plans = new ArrayList<>();

        Map<String, Object> freePlan = new LinkedHashMap<>();
        freePlan.put("id", "free");
        freePlan.put("name", "Free Active Plan");
        freePlan.put("price", 0);
        freePlan.put("billingCycle", "forever");
        freePlan.put("features", Arrays.asList("Home Overview", "Healthy Recipes Catalog", "AI Calorie & Meal Studio"));
        plans.add(freePlan);

        Map<String, Object> monthlyPlan = new LinkedHashMap<>();
        monthlyPlan.put("id", "monthly");
        monthlyPlan.put("name", "Pro Monthly");
        monthlyPlan.put("price", 499);
        monthlyPlan.put("billingCycle", "month");
        monthlyPlan.put("features", Arrays.asList("7-Day AI Precision Meal Plan", "AI Hydration & Fasting", "Family Leaderboard & Streaks", "Pantry Vision Scanner"));
        plans.add(monthlyPlan);

        Map<String, Object> annualPlan = new LinkedHashMap<>();
        annualPlan.put("id", "annual");
        annualPlan.put("name", "Elite Annual");
        annualPlan.put("price", 3499);
        annualPlan.put("billingCycle", "year");
        annualPlan.put("discount", "40% OFF");
        annualPlan.put("features", Arrays.asList("All Pro Features", "Medical Blood Report OCR", "20 Live Telehealth Doctors", "90-Day Predictive Digital Twin"));
        plans.add(annualPlan);

        response.put("plans", plans);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upgrade")
    public ResponseEntity<Map<String, Object>> upgradePlan(
            @RequestParam String planId,
            @RequestParam(defaultValue = "upi") String paymentMethod,
            @RequestParam(required = false) String userId) {
        
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "SUCCESS");
        response.put("transactionId", "TXN-NV-" + System.currentTimeMillis());
        response.put("activePlan", planId);
        response.put("paymentMethod", paymentMethod);
        response.put("unlockedAt", new Date().toString());
        response.put("message", "Subscription successfully upgraded to " + planId + " plan.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> checkPlanStatus(@RequestParam(defaultValue = "free") String planId) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "SUCCESS");
        response.put("planId", planId);
        response.put("hasProAccess", "monthly".equals(planId) || "annual".equals(planId));
        response.put("hasEliteAccess", "annual".equals(planId));
        return ResponseEntity.ok(response);
    }
}
