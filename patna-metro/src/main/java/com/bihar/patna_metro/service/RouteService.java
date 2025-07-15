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

    // New method to find route between two stations ordered by sequenceNumber
    public List<Station> findRoute(String sourceName, String destinationName) {
        Station source = stationRepository.findByName(sourceName).orElse(null);
        Station destination = stationRepository.findByName(destinationName).orElse(null);

        if (source == null || destination == null) {
            return new ArrayList<>(); // Return empty if source or destination not found
        }

        if (source.getLine().equals(destination.getLine())) {
            int startSeq = source.getSequenceNumber();
            int endSeq = destination.getSequenceNumber();

            return stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                    source.getLine(),
                    Math.min(startSeq, endSeq),
                    Math.max(startSeq, endSeq)
            );
        } else {
            // Different lines - interchange logic can be added later
            return new ArrayList<>();
        }
    }
}