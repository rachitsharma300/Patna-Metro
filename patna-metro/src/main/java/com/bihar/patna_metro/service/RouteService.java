package com.bihar.patna_metro.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bihar.patna_metro.model.Route;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.RouteRepository;
import com.bihar.patna_metro.repository.StationRepository;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StationRepository stationRepository;

    /**
     * Fetch all saved metro routes from database.
     * (Mostly useful for admin / debugging / future features)
     */
    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    /**
     * Save a metro route definition in database.
     * (Not used in live route calculation, kept for extensibility)
     */
    public Route saveRoute(Route route) {
        return routeRepository.save(route);
    }

    /**
     * Finds route between two stations based on sequence number.
     *
     * Logic:
     * - Fetch source and destination stations by name
     * - If both are on the same metro line:
     *     → Return all stations between them ordered by sequence number
     * - If stations are on different lines:
     *     → Interchange logic can be added later
     */
    public List<Station> findRoute(String sourceName, String destinationName) {

        // Fetch stations by name (Mongo returns list, not Optional)
        List<Station> sourceList = stationRepository.findByName(sourceName);
        List<Station> destinationList = stationRepository.findByName(destinationName);

        // If either source or destination does not exist
        if (sourceList.isEmpty() || destinationList.isEmpty()) {
            return new ArrayList<>(); // No valid route possible
        }

        // Take first matching station (names are assumed unique per line)
        Station source = sourceList.get(0);
        Station destination = destinationList.get(0);

        // If both stations are on the same metro line
        if (source.getLine().equals(destination.getLine())) {

            int startSeq = source.getSequenceNumber();
            int endSeq = destination.getSequenceNumber();

            // Fetch all stations between source and destination (inclusive)
            // Order is always ascending for correct travel sequence
            return stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                    source.getLine(),
                    Math.min(startSeq, endSeq),
                    Math.max(startSeq, endSeq)
            );
        }
        else {
            // Different lines selected
            // Interchange logic can be implemented here in future
            return new ArrayList<>();
        }
    }
}
