package com.bihar.patna_metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

@Service
public class FareService {

    @Autowired
    private StationRepository stationRepository;

    public double calculateFare(String sourceName, String destinationName) {
        Station source = stationRepository.findByName(sourceName);
        Station destination = stationRepository.findByName(destinationName);

        if (source == null || destination == null) {
            throw new IllegalArgumentException("Invalid station name");
        }

        double distance = calculateDistance(
                source.getLatitude(), source.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        double fare;
        if (distance <= 2) fare = 10;
        else if (distance <= 5) fare = 20;
        else if (distance <= 12) fare = 30;
        else if (distance <= 21) fare = 40;
        else if (distance <= 32) fare = 50;
        else fare = 60;

        return fare;
    }

    public double calculateEstimatedTime(String sourceName, String destinationName) {
        Station source = stationRepository.findByName(sourceName);
        Station destination = stationRepository.findByName(destinationName);

        if (source == null || destination == null) {
            throw new IllegalArgumentException("Invalid station name");
        }

        double distance = calculateDistance(
                source.getLatitude(), source.getLongitude(),
                destination.getLatitude(), destination.getLongitude()
        );

        double speed = 30.0; // Average metro speed in km/h
        double timeInHours = distance / speed;
        double timeInMinutes = timeInHours * 60;

        return timeInMinutes; // returns estimated time in minutes
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
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
