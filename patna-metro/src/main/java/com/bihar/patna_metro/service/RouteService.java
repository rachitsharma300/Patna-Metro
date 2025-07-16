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

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route saveRoute(Route route) {
        return routeRepository.save(route);
    }

    // ✅ Updated method to find route between two stations ordered by sequenceNumber
    public List<Station> findRoute(String sourceName, String destinationName) {

        // ✔️ Fetching list instead of Optional
        List<Station> sourceList = stationRepository.findByName(sourceName);
        List<Station> destinationList = stationRepository.findByName(destinationName);

        if (sourceList.isEmpty() || destinationList.isEmpty()) {
            return new ArrayList<>(); // Return empty if source or destination not found
        }

        Station source = sourceList.get(0);
        Station destination = destinationList.get(0);

        if (source.getLine().equals(destination.getLine())) {
            int startSeq = source.getSequenceNumber();
            int endSeq = destination.getSequenceNumber();

            return stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                    source.getLine(),
                    Math.min(startSeq, endSeq),
                    Math.max(startSeq, endSeq)
            );
        } else {
            // TODO: Different lines - interchange logic can be implemented here later
            return new ArrayList<>();
        }
    }
}
