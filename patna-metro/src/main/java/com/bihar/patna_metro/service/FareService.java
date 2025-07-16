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

    /**
     * Calculates fare between two stations based on Delhi Metro-style slabs.
     * @param sourceName source station name
     * @param destinationName destination station name
     * @return calculated fare
     */
    public double calculateFare(String sourceName, String destinationName) {
        List<Station> sourceList = stationRepository.findByName(sourceName);
        List<Station> destList = stationRepository.findByName(destinationName);

        if (sourceList.isEmpty() || destList.isEmpty()) {
            throw new IllegalArgumentException("Invalid station name");
        }

        Station source = sourceList.get(0);
        Station destination = destList.get(0);

        double distance = calculateDistance(
                source.getLatitude(), source.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        return getFareByDistance(distance);
    }

    /**
     * Returns fare based on distance slabs (Delhi Metro approximate model).
     */
    private double getFareByDistance(double distanceKm) {
        if (distanceKm <= 2) return 10;
        else if (distanceKm <= 5) return 20;
        else if (distanceKm <= 12) return 30;
        else if (distanceKm <= 21) return 40;
        else if (distanceKm <= 32) return 50;
        else return 60;
    }

    /**
     * Haversine formula to calculate distance between two lat-long points in km.
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // distance in km
    }
}
