package com.nutriverse.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/nutrition/family-leaderboard")
@Tag(name = "Family Health Leaderboard APIs", description = "Family wellness rankings, habit streaks, daily quests, and rewards REST APIs")
public class FamilyLeaderboardController {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FamilyMemberDto {
        private String id;
        private String name;
        private String relation;
        private String avatar;
        private double healthScore;
        private int streakDays;
        private int points;
        private String badge;
        private int rank;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LeaderboardSummaryResponse {
        private List<FamilyMemberDto> members;
        private int totalFamilyPoints;
        private int topStreakDays;
        private String activeRewardStatus;
    }

    @GetMapping("/summary")
    @Operation(summary = "Get Family Health Leaderboard Roster", description = "Fetches current family members ranked by wellness points and habit streaks")
    public ResponseEntity<LeaderboardSummaryResponse> getLeaderboardRoster() {
        List<FamilyMemberDto> roster = List.of(
                FamilyMemberDto.builder()
                        .id("1")
                        .name("Engineer Ankita Badadhe")
                        .relation("You (Self)")
                        .avatar("👩‍💻")
                        .healthScore(9.4)
                        .streakDays(14)
                        .points(1450)
                        .badge("🥇 Health Champion")
                        .rank(1)
                        .build(),
                FamilyMemberDto.builder()
                        .id("2")
                        .name("Sandeep Sahani")
                        .relation("Spouse")
                        .avatar("👨‍💼")
                        .healthScore(8.9)
                        .streakDays(10)
                        .points(1180)
                        .badge("🥈 Hydration Titan")
                        .rank(2)
                        .build(),
                FamilyMemberDto.builder()
                        .id("3")
                        .name("Trupti Badadhe")
                        .relation("Sister")
                        .avatar("👩")
                        .healthScore(9.1)
                        .streakDays(8)
                        .points(980)
                        .badge("🥉 Active Explorer")
                        .rank(3)
                        .build(),
                FamilyMemberDto.builder()
                        .id("4")
                        .name("Alka Badadhe")
                        .relation("Mother")
                        .avatar("👵")
                        .healthScore(8.7)
                        .streakDays(6)
                        .points(750)
                        .badge("⭐ Wellness Ambassador")
                        .rank(4)
                        .build()
        );

        LeaderboardSummaryResponse response = LeaderboardSummaryResponse.builder()
                .members(roster)
                .totalFamilyPoints(4360)
                .topStreakDays(14)
                .activeRewardStatus("1,450 / 2,000 Pts (72.5% Complete for Free Consultation Pass)")
                .build();

        return ResponseEntity.ok(response);
    }
}
