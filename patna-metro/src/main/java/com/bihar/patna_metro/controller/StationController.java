package com.bihar.patna_metro.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.StationService;
import com.bihar.patna_metro.repository.StationRepository;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    @Autowired
    private StationService stationService;

    @Autowired
    private StationRepository stationRepository;

    /**
     * Get all stations
     * @return list of all stations
     */
    @GetMapping
    public List<Station> getAllStations() {
        return stationService.getAllStations();
    }

    /**
     * Save a new station
     * @param station Station object to save
     * @return saved station
     */
    @PostMapping
    public Station saveStation(@RequestBody Station station) {
        return stationService.saveStation(station);
    }

    /**
     * Get route path between two stations (inclusive)
     * @param source source station name
     * @param destination destination station name
     * @return list of stations forming the route
     */
    @GetMapping("/route")
    public List<Station> getRoute(@RequestParam String source, @RequestParam String destination) {
        List<Station> allStations = stationRepository.findAll();

        int sourceIndex = -1;
        int destIndex = -1;

        // Find indexes of source and destination stations
        for (int i = 0; i < allStations.size(); i++) {
            if (allStations.get(i).getName().equalsIgnoreCase(source)) {
                sourceIndex = i;
            }
            if (allStations.get(i).getName().equalsIgnoreCase(destination)) {
                destIndex = i;
            }
        }

        // If any station not found, throw exception
        if (sourceIndex == -1 || destIndex == -1) {
            throw new IllegalArgumentException("Invalid source or destination station name.");
        }

        // Return sublist based on order
        if (sourceIndex <= destIndex) {
            return allStations.subList(sourceIndex, destIndex + 1);
        } else {
            List<Station> sublist = allStations.subList(destIndex, sourceIndex + 1);
            // Optionally reverse list if needed for correct order
            // Collections.reverse(sublist);
            return sublist;
        }
    }
}
