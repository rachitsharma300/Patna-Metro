package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteFinderService {

    @Autowired
    private StationRepository stationRepository;

    /**
     * Finds the complete metro route between source and destination.
     *
     * - Uses cache to avoid recalculating same routes again & again
     * - Handles:
     *    1. Same line routes
     *    2. Different line routes via interchange stations
     */
    @Cacheable(
            value = "routes",
            key = "#sourceName + '-' + #destinationName"
    )
    public List<Station> findRoute(String sourceName, String destinationName) {

        // Fetch first matching station for source & destination
        Station source = getFirstStation(sourceName);
        Station destination = getFirstStation(destinationName);

        // Debug log to verify caching behaviour
        System.out.println("Cache Testing");

        // If either station not found, no route possible
        if (source == null || destination == null) {
            return Collections.emptyList();
        }

        // Case 1: Source and destination are on the SAME metro line
        if (source.getLine().equals(destination.getLine())) {
            return getStationsBetween(source, destination);
        }

        // Case 2: Different metro lines → find possible interchange stations dynamically
        List<String> interchangeStations = stationRepository.findAll().stream()
                .collect(java.util.stream.Collectors.groupingBy(Station::getName))
                .entrySet().stream()
                .filter(entry -> entry.getValue().size() > 1)
                .map(java.util.Map.Entry::getKey)
                .toList();

        // Try routing via each interchange station
        for (String interchangeName : interchangeStations) {

            // Interchange station on source line
            Station interchangeOnSourceLine =
                    getStationByNameAndLine(interchangeName, source.getLine());

            // Interchange station on destination line
            Station interchangeOnDestinationLine =
                    getStationByNameAndLine(interchangeName, destination.getLine());

            // If interchange exists on both lines, route is possible
            if (interchangeOnSourceLine != null && interchangeOnDestinationLine != null) {

                // Route from source to interchange
                List<Station> routeToInterchange =
                        getStationsBetween(source, interchangeOnSourceLine);

                // Route from interchange to destination
                List<Station> routeFromInterchange =
                        getStationsBetween(interchangeOnDestinationLine, destination);

                // Combine both routes into one full journey
                List<Station> fullRoute = new ArrayList<>(routeToInterchange);

                // Avoid duplicate interchange station in final route
                if (fullRoute.isEmpty() ||
                        !fullRoute.get(fullRoute.size() - 1)
                                .getName()
                                .equals(interchangeOnDestinationLine.getName())) {
                    fullRoute.add(interchangeOnDestinationLine);
                }

                // Add remaining destination route (skip the first station as it's the duplicate interchange)
                if (!routeFromInterchange.isEmpty()) {
                    fullRoute.addAll(routeFromInterchange.subList(1, routeFromInterchange.size()));
                }

                return fullRoute;
            }
        }

        // No valid route found
        return Collections.emptyList();
    }

    /**
     * Returns the first station matching the given name.
     * (Assumes station names are unique per line)
     */
    private Station getFirstStation(String name) {
        List<Station> stations = stationRepository.findByName(name);
        return stations.isEmpty() ? null : stations.get(0);
    }

    /**
     * Finds a station by name AND specific metro line.
     * Used mainly for interchange handling.
     */
    private Station getStationByNameAndLine(String name, String line) {
        List<Station> stations = stationRepository.findByName(name);
        return stations.stream()
                .filter(s -> s.getLine().equals(line))
                .findFirst()
                .orElse(null);
    }

    /**
     * Returns all stations between source and destination (inclusive),
     * ordered correctly using sequence numbers.
     */
    private List<Station> getStationsBetween(Station source, Station destination) {
        String line = source.getLine();
        int start = source.getSequenceNumber();
        int end = destination.getSequenceNumber();

        List<Station> stations;

        if (start == end) {
            return new ArrayList<>(List.of(source));
        } 
        
        if (start < end) {
            // Forward
            stations = stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(line, start, end);
        } else {
            // Reverse
            stations = stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(line, end, start);
            Collections.reverse(stations);
        }

        // Robust cleanup: ensure source is first and destination is last, and remove intermediate duplicates
        if (stations.isEmpty()) {
            return new ArrayList<>(List.of(source, destination));
        }

        // Final safety: if the result list isn't exactly source->dest, fix the boundaries
        if (!stations.get(0).getName().equals(source.getName())) {
            stations.add(0, source);
        }
        if (!stations.get(stations.size() - 1).getName().equals(destination.getName())) {
            stations.add(destination);
        }

        return stations;
    }
}
