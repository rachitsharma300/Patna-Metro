package com.bihar.patna_metro.bot.dto;

import com.bihar.patna_metro.model.Station;
import lombok.Data;
import java.util.List;

@Data
public class RouteDetails {
    private List<String> lines;
    private int totalTime;
    private int fare;
    private String interchange;
    private List<Station> stations;
}