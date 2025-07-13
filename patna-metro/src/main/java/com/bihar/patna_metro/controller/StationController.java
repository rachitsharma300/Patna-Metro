package com.bihar.patna_metro.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.StationService;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping
    public List<Station> getAllStations() {
        return stationService.getAllStations();
    }

    @PostMapping
    public Station saveStation(@RequestBody Station station) {
        return stationService.saveStation(station);
    }
}
