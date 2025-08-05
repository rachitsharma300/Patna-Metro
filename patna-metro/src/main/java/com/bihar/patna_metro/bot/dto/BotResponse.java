package com.bihar.patna_metro.bot.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BotResponse {
    private String hindiText;    // For Hindi Response
    private int timeMinutes;     // Travel time in min
    private int fareRupees;      // Fare
    private String interchange;  // If exists interchange
}