package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstimatedTimeService {

    @Autowired
    private RouteFinderService routeFinderService;

    // Metro Configuration (Adjust these values as needed)
    private static final double AVERAGE_SPEED_KMPH = 32; // Metro trains don't run at full speed between close stations
    private static final double STATION_STOP_TIME_MINUTES = 0.75; // 45 seconds per station stop
    private static final int INTERCHANGE_PENALTY_MINUTES = 7; // Time penalty for line changes
    private static final double AVERAGE_DISTANCE_BETWEEN_STATIONS_KM = 1.2; // Typical metro station distance

    /**
     * Calculates realistic travel time between stations
     */
    public int calculateEstimatedTime(String sourceName, String destinationName) {
        List<Station> route =  routeFinderService.findRoute(sourceName, destinationName);

        if (route.isEmpty()) {
            throw new IllegalArgumentException("No route found between stations");
        }
        if (route.size() == 1) {
            return 0; // Same station selected
        }

        // Calculate total route distance (precise if available, otherwise estimated)
        double totalDistanceKm = calculateTotalRouteDistance(route);

        // Calculate components
        int movingTime = calculateMovingTime(totalDistanceKm);
        int stoppingTime = calculateStoppingTime(route.size());
        int interchangeTime = checkInterchange(route) ? INTERCHANGE_PENALTY_MINUTES : 0;

        return movingTime + stoppingTime + interchangeTime;
    }

    /**
     * Calculates total route distance (precise calculation)
     */
    private double calculateTotalRouteDistance(List<Station> route) {
        double totalDistance = 0;

        // Sum distances between consecutive stations
        for (int i = 0; i < route.size() - 1; i++) {
            Station current = route.get(i);
            Station next = route.get(i + 1);
            totalDistance += calculateDistanceBetweenStations(current, next);
        }

        return totalDistance;
    }

    /**
     * Haversine formula for distance between two stations (in km)
     */
    private double calculateDistanceBetweenStations(Station a, Station b) {
        final int EARTH_RADIUS_KM = 6371;

        double lat1 = a.getLatitude();
        double lon1 = a.getLongitude();
        double lat2 = b.getLatitude();
        double lon2 = b.getLongitude();

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double haversine = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double angularDistance = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

        return EARTH_RADIUS_KM * angularDistance;
    }

    /**
     * Time spent moving between stations (in minutes)
     */
    private int calculateMovingTime(double distanceKm) {
        return (int) Math.round((distanceKm / AVERAGE_SPEED_KMPH) * 60);
    }

    /**
     * Time spent stopped at stations (in minutes)
     */
    private int calculateStoppingTime(int numberOfStations) {
        return (int) Math.round((numberOfStations - 1) * STATION_STOP_TIME_MINUTES);
    }

    /**
     * Checks if route requires line interchange
     */
    private boolean checkInterchange(List<Station> route) {
        String firstLine = route.get(0).getLine();
        return route.stream().anyMatch(station -> !station.getLine().equals(firstLine));
    }
}