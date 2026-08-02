package com.nutriverse.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> rootStatus() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("app", "NutriVerse AI Precision Clinical Nutrition API Engine");
        response.put("version", "1.0.0");
        response.put("framework", "Spring Boot 3.3.0 / Java 21");
        response.put("healthCheck", "OK");
        return ResponseEntity.ok(response);
    }
}
