package com.nutriverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class NutriVerseApplication {

    public static void main(String[] args) {
        SpringApplication.run(NutriVerseApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("  NutriVerse AI Core Backend Engine Running on Java 21 / Spring Boot 3  ");
        System.out.println("==================================================================");
    }
}
