package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FareService {

    @Autowired
    private RouteFinderService routeFinderService;

    /**
     * FINAL OFFICIAL-LIKE FARE LOGIC (SLAB BASED)
     *
     * 1–2 stations  -> ₹15
     * 3–4 stations  -> ₹20
     * 5–7 stations  -> ₹25
     * 8+ stations   -> ₹30 (max)
     */

    @Cacheable(
            value = "fares",
            key = "#sourceName + '-' + #destinationName"
    )
    public int calculateFare(String sourceName, String destinationName) {

        List<Station> route = routeFinderService.findRoute(sourceName, destinationName);

        if (route == null || route.size() <= 1) {
            return 15; // minimum fare
        }

        int passingStations = route.size() - 1;

        if (passingStations <= 2) {
            return 15;
        } else if (passingStations <= 4) {
            return 20;
        } else if (passingStations <= 7) {
            return 25;
        } else {
            return 30; // end-to-end max fare
        }
    }
}
