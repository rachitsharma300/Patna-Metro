package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstimatedTimeService {

    @Autowired
    private RouteFinderService routeFinderService;

    /**
     * FINAL TIME LOGIC
     * Time = passing stations × avg time per station
     */

    public int calculateEstimatedTime(String sourceName, String destinationName) {

        List<Station> route = routeFinderService.findRoute(sourceName, destinationName);

        if (route == null || route.size() <= 1) {
            return 0;
        }

        int passingStations = route.size() - 1;
        double avgTimePerStation = 2.5; // minutes
        
        double totalTime = passingStations * avgTimePerStation;

        // Check for line interchange (Transfer Penalty)
        long distinctLines = route.stream()
                .map(Station::getLine)
                .distinct()
                .count();

        if (distinctLines > 1) {
            totalTime += 5.0; // 5 minutes interchange penalty
        }

        return (int) Math.round(totalTime);
    }
}
