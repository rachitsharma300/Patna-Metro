package com.bihar.patna_metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

import java.util.Optional;

@Service
public class EstimatedTimeService {

    @Autowired
    private StationRepository stationRepository;

    /**
     * Calculates estimated travel time between two stations
     * @param sourceName - source station name
     * @param destinationName - destination station name
     * @return estimated time in minutes
     */
    public double calculateEstimatedTime(String sourceName, String destinationName) {
        Optional<Station> optionalSource = stationRepository.findByName(sourceName);
        Optional<Station> optionalDestination = stationRepository.findByName(destinationName);

        if (optionalSource.isEmpty() || optionalDestination.isEmpty()) {
            throw new IllegalArgumentException("Invalid station name");
        }

        Station source = optionalSource.get();
        Station destination = optionalDestination.get();

        // Calculate distance using Haversine formula
        double distance = calculateDistance(
                source.getLatitude(), source.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        // Assuming average metro speed = 35 km/h
        double time = (distance / 35) * 60;

        return time;
    }

    /**
     * Haversine formula to calculate distance between two lat-long points in km
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
