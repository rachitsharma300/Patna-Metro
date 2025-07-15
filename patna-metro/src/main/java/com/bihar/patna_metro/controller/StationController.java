package com.bihar.patna_metro.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    @Autowired
    private StationRepository stationRepository;

    @GetMapping
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    @PostMapping
    public Station saveStation(@RequestBody Station station) {
        return stationRepository.save(station);
    }

    /**
     * Get route between source and destination, including interchange if on different lines.
     */
    @GetMapping("/route")
    public List<Station> getRoute(@RequestParam String source, @RequestParam String destination) {
        Station src = stationRepository.findByName(source)
                .orElseThrow(() -> new IllegalArgumentException("Invalid source"));

        Station dest = stationRepository.findByName(destination)
                .orElseThrow(() -> new IllegalArgumentException("Invalid destination"));

        List<Station> route = new ArrayList<>();

        if (src.getLine().equals(dest.getLine())) {
            // Same line route
            List<Station> stations = stationRepository.findByLineOrderBySequenceNumberAsc(src.getLine());
            int srcIdx = findIndex(stations, src.getName());
            int destIdx = findIndex(stations, dest.getName());

            if (srcIdx <= destIdx) {
                route = stations.subList(srcIdx, destIdx + 1);
            } else {
                route = stations.subList(destIdx, srcIdx + 1);
                Collections.reverse(route);
            }
        } else {
            // Different lines – find interchange stations
            List<Station> srcLineStations = stationRepository.findByLineOrderBySequenceNumberAsc(src.getLine());
            List<Station> destLineStations = stationRepository.findByLineOrderBySequenceNumberAsc(dest.getLine());

            // Find common station names on both lines as interchange
            Set<String> srcNames = new HashSet<>();
            for (Station s : srcLineStations) srcNames.add(s.getName());

            Station interchangeOnDestLine = null;
            for (Station s : destLineStations) {
                if (srcNames.contains(s.getName())) {
                    interchangeOnDestLine = s;
                    break;
                }
            }

            if (interchangeOnDestLine == null) {
                throw new IllegalArgumentException("No interchange station found between lines.");
            }

            Station interchangeOnSrcLine = stationRepository.findByName(interchangeOnDestLine.getName())
                    .filter(s -> s.getLine().equals(src.getLine()))
                    .orElseThrow(() -> new IllegalArgumentException("Interchange missing on source line"));

            // Part 1: source to interchange on source line
            int srcIdx = findIndex(srcLineStations, src.getName());
            int interIdxSrc = findIndex(srcLineStations, interchangeOnSrcLine.getName());
            List<Station> part1 = srcIdx <= interIdxSrc
                    ? srcLineStations.subList(srcIdx, interIdxSrc + 1)
                    : srcLineStations.subList(interIdxSrc, srcIdx + 1);
            if (srcIdx > interIdxSrc) Collections.reverse(part1);

            // Part 2: interchange on dest line to destination
            int interIdxDest = findIndex(destLineStations, interchangeOnDestLine.getName());
            int destIdx = findIndex(destLineStations, dest.getName());
            List<Station> part2 = interIdxDest <= destIdx
                    ? destLineStations.subList(interIdxDest + 1, destIdx + 1)
                    : destLineStations.subList(destIdx, interIdxDest);
            if (interIdxDest > destIdx) Collections.reverse(part2);

            // Merge
            route.addAll(part1);
            route.add(interchangeOnDestLine); // add interchange point
            route.addAll(part2);
        }

        return route;
    }

    private int findIndex(List<Station> stations, String name) {
        for (int i = 0; i < stations.size(); i++) {
            if (stations.get(i).getName().equalsIgnoreCase(name)) {
                return i;
            }
        }
        throw new IllegalArgumentException("Station not found: " + name);
    }

}
