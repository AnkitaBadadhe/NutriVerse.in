package com.nutriverse.service;

import com.nutriverse.domain.model.Appointment;
import com.nutriverse.domain.model.Practitioner;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TelehealthService {

    public List<Practitioner> getVerifiedPractitioners() {
        return List.of(
                Practitioner.builder()
                        .id(UUID.randomUUID())
                        .fullName("Dr. Robert Chen, MD")
                        .specialty("Endocrinologist & Diabetes Specialist")
                        .licenseNumber("MD-890123")
                        .rating(BigDecimal.valueOf(4.98))
                        .hourlyRateUsd(BigDecimal.valueOf(150.00))
                        .isVerified(true)
                        .build(),
                Practitioner.builder()
                        .id(UUID.randomUUID())
                        .fullName("Ananya Deshmukh, RD")
                        .specialty("Pediatric & Clinical Nutritionist")
                        .licenseNumber("RD-541290")
                        .rating(BigDecimal.valueOf(4.92))
                        .hourlyRateUsd(BigDecimal.valueOf(95.00))
                        .isVerified(true)
                        .build()
        );
    }

    public Appointment bookConsultation(UUID profileId, UUID practitionerId, LocalDateTime scheduledAt) {
        String webrtcRoomId = "nutriverse-room-" + UUID.randomUUID().toString().substring(0, 8);
        String roomLink = "https://meet.nutriverse.ai/" + webrtcRoomId;

        return Appointment.builder()
                .id(UUID.randomUUID())
                .profileId(profileId)
                .practitionerId(practitionerId)
                .scheduledAt(scheduledAt)
                .status(Appointment.AppointmentStatus.BOOKED)
                .roomLink(roomLink)
                .build();
    }
}
