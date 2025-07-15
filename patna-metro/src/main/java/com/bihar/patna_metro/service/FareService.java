package com.bihar.patna_metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

import java.util.Optional;

@Service
public class FareService {

    @Autowired
    private StationRepository stationRepository;

    /**
     * Calculates fare between two stations based on distance.
     * @param sourceName source station name
     * @param destinationName destination station name
     * @return calculated fare
     */
    public double calculateFare(String sourceName, String destinationName) {
        Optional<Station> sourceOpt = stationRepository.findByName(sourceName);
        Optional<Station> destOpt = stationRepository.findByName(destinationName);

        if (sourceOpt.isEmpty() || destOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid station name");
        }

        Station source = sourceOpt.get();
        Station destination = destOpt.get();

        // Calculate distance using your utility or simple formula here
        double distance = calculateDistance(
                source.getLatitude(), source.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        // Fare calculation logic (example: ₹10 for first 2km + ₹5/km afterwards)
        double fare = 10;
        if (distance > 2) {
            fare += (distance - 2) * 5;
        }
        return fare;
    }

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
