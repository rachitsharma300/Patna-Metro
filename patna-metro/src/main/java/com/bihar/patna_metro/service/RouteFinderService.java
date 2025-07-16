package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteFinderService {

    @Autowired
    private StationRepository stationRepository;

    public List<Station> findRoute(String sourceName, String destinationName) {
        Station source = getFirstStation(sourceName);
        Station destination = getFirstStation(destinationName);

        if (source == null || destination == null) {
            return Collections.emptyList();
        }

        // If same line, return direct route
        if (source.getLine().equals(destination.getLine())) {
            return getStationsBetween(source, destination);
        }

        // Find common interchange stations between the lines
        List<String> interchangeStations = Arrays.asList("Patna Junction", "Khemni Chak");

        for (String interchangeName : interchangeStations) {
            Station interchangeOnSourceLine = getStationByNameAndLine(interchangeName, source.getLine());
            Station interchangeOnDestinationLine = getStationByNameAndLine(interchangeName, destination.getLine());

            if (interchangeOnSourceLine != null && interchangeOnDestinationLine != null) {
                List<Station> routeToInterchange = getStationsBetween(source, interchangeOnSourceLine);
                List<Station> routeFromInterchange = getStationsBetween(interchangeOnDestinationLine, destination);

                // Combine the routes
                List<Station> fullRoute = new ArrayList<>(routeToInterchange);

                // Add the interchange station on destination line if not already present
                if (fullRoute.isEmpty() ||
                        !fullRoute.get(fullRoute.size()-1).getName().equals(interchangeOnDestinationLine.getName())) {
                    fullRoute.add(interchangeOnDestinationLine);
                }

                // Add the remaining route
                fullRoute.addAll(routeFromInterchange);

                return fullRoute;
            }
        }

        return Collections.emptyList(); // no route found
    }

    private Station getFirstStation(String name) {
        List<Station> stations = stationRepository.findByName(name);
        return stations.isEmpty() ? null : stations.get(0);
    }

    private Station getStationByNameAndLine(String name, String line) {
        List<Station> stations = stationRepository.findByName(name);
        return stations.stream()
                .filter(s -> s.getLine().equals(line))
                .findFirst()
                .orElse(null);
    }

    private List<Station> getStationsBetween(Station source, Station destination) {
        String line = source.getLine();
        int start = source.getSequenceNumber();
        int end = destination.getSequenceNumber();

        List<Station> stations;

        if (start <= end) {
            stations = stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(line, start, end);
        } else {
            stations = stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(line, end, start);
            Collections.reverse(stations); // Reverse to maintain source to destination order
        }

        return stations;
    }
}