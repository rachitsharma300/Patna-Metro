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

        if (source.getLine().equals(destination.getLine())) {
            return getStationsBetween(source, destination);
        }

        // Interchange logic
        List<String> interchangeStations = Arrays.asList("Patna Junction", "Khemni Chak");

        for (String interchangeName : interchangeStations) {
            Station interchangeOnSourceLine = getStationByNameAndLine(interchangeName, source.getLine());
            Station interchangeOnDestinationLine = getStationByNameAndLine(interchangeName, destination.getLine());

            if (interchangeOnSourceLine != null && interchangeOnDestinationLine != null) {
                List<Station> part1 = getStationsBetween(source, interchangeOnSourceLine);
                List<Station> part2 = getStationsBetween(interchangeOnDestinationLine, destination);

                List<Station> fullRoute = new ArrayList<>(part1);
                if (!part2.isEmpty()) {
                    fullRoute.add(interchangeOnDestinationLine); // add interchange if not duplicate
                    fullRoute.addAll(part2);
                }

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
        int start = Math.min(source.getSequenceNumber(), destination.getSequenceNumber());
        int end = Math.max(source.getSequenceNumber(), destination.getSequenceNumber());
        return stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(line, start, end);
    }
}
