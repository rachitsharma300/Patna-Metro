package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.RouteFinderService;
import com.bihar.patna_metro.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    @Autowired
    private StationService stationService;

    @Autowired
    private RouteFinderService routeFinderService;

    @GetMapping
    public List<Station> getAllStations() {
        return stationService.getAllStations();
    }

    @GetMapping("/route")
    public List<Station> getRoute(@RequestParam String source, @RequestParam String destination) {
        return routeFinderService.findRoute(source, destination);
    }
}
