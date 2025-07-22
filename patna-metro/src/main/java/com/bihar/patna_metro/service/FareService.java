package com.bihar.patna_metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

import java.util.List;

@Service
public class FareService {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private RouteFinderService routeFinderService;

    /**
     * Calculates accurate fare based on actual track distance
     */
    public int calculateFare(String sourceName, String destinationName) {
        List<Station> route = routeFinderService.findRoute(sourceName, destinationName);

        if (route.isEmpty()) {
            throw new IllegalArgumentException("No route found between stations");
        }
        if (route.size() == 1) {
            return 10; // Base fare for same station
        }

        double totalDistance = calculateRouteDistance(route);
        return getDelhiMetroStyleFare(totalDistance);
    }

    /**
     * Calculates cumulative distance of entire route (station-to-station)
     */
    private double calculateRouteDistance(List<Station> route) {
        double totalDistance = 0;

        for (int i = 0; i < route.size() - 1; i++) {
            Station current = route.get(i);
            Station next = route.get(i + 1);
            totalDistance += calculateDistance(
                    current.getLatitude(), current.getLongitude(),
                    next.getLatitude(), next.getLongitude()
            );
        }

        return totalDistance;
    }

    /**
     * Delhi Metro fare structure (updated 2023)
     */
    private int getDelhiMetroStyleFare(double distanceKm) {
        if (distanceKm <= 2) return 10;
        else if (distanceKm <= 5) return 20;
        else if (distanceKm <= 12) return 30;
        else if (distanceKm <= 21) return 40;
        else if (distanceKm <= 32) return 50;
        else return 60;
    }

    /**
     * Haversine formula (keep your existing implementation)
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Your existing implementation
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}