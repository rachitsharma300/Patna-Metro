package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FareService {

    @Autowired
    private RouteFinderService routeFinderService;

    /**
     * Calculates Patna Metro fare based on actual route distance
     * Official Phase-1 Fare:
     * Min ₹15 | Max ₹30
     */
    public int calculateFare(String sourceName, String destinationName) {

        List<Station> route = routeFinderService.findRoute(sourceName, destinationName);

        if (route == null || route.isEmpty()) {
            throw new IllegalArgumentException("No route found between given stations");
        }

        // Same source and destination → minimum fare
        if (route.size() == 1) {
            return 15;
        }

        double totalDistanceKm = calculateRouteDistance(route);
        return getPatnaMetroFare(totalDistanceKm);
    }

    /**
     * Calculates total distance of the route using station lat/long
     */
    private double calculateRouteDistance(List<Station> route) {
        double totalDistance = 0.0;

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
     * Official Patna Metro Fare Logic (Phase-1)
     */
    private int getPatnaMetroFare(double distanceKm) {

        if (distanceKm <= 2) {
            return 15;
        } else if (distanceKm <= 5) {
            return 20;
        } else {
            return 30;
        }
    }

    /**
     * Haversine formula to calculate distance between two geo points
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {

        final int R = 6371; // Earth radius in KM

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}
