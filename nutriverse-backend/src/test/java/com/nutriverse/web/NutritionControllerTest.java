package com.nutriverse.web;

import com.nutriverse.service.NutritionEngineService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class NutritionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /nutrition/macros/calculate - Should return 200 OK and valid macro JSON")
    void testCalculateMacrosEndpoint() throws Exception {
        mockMvc.perform(get("/nutrition/macros/calculate")
                        .param("weightKg", "70.0")
                        .param("heightCm", "175.0")
                        .param("age", "30")
                        .param("gender", "MALE")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.calories").exists())
                .andExpect(jsonPath("$.proteinGrams").exists());
    }
}
