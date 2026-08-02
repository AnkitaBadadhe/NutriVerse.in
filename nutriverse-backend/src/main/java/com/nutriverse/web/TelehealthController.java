package com.nutriverse.web;

import com.nutriverse.domain.model.Appointment;
import com.nutriverse.domain.model.Practitioner;
import com.nutriverse.service.TelehealthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/telehealth")
@RequiredArgsConstructor
@Tag(name = "Telehealth & Marketplace", description = "Verified Practitioner Bookings & WebRTC Teleconsultation APIs")
public class TelehealthController {

    private final TelehealthService telehealthService;

    @GetMapping("/practitioners")
    @Operation(summary = "List Verified Practitioners", description = "Retrieves verified doctors, dietitians, and coaches with rating and hourly rates")
    public ResponseEntity<List<Practitioner>> getPractitioners() {
        return ResponseEntity.ok(telehealthService.getVerifiedPractitioners());
    }

    @PostMapping("/book")
    @Operation(summary = "Book Telehealth Consultation", description = "Schedules a video appointment and generates a WebRTC video room link")
    public ResponseEntity<Appointment> bookConsultation(
            @RequestParam UUID profileId,
            @RequestParam UUID practitionerId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime scheduledAt) {

        Appointment appointment = telehealthService.bookConsultation(profileId, practitionerId, scheduledAt);
        return ResponseEntity.ok(appointment);
    }
}
