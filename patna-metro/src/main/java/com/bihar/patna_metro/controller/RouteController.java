package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.RouteFinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/route")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {

    @Autowired
    private RouteFinderService routeFinderService;

    @PostMapping
    public Map<String, Object> findRoute(@RequestBody Map<String, String> request) {
        String source = request.get("source");
        String destination = request.get("destination");

        Map<String, Object> response = new HashMap<>();

        if (source == null || destination == null) {
            response.put("error", "Source or destination missing");
            return response;
        }

        //  Dummy implementation - Replace with actual logic
        List<Station> route = routeFinderService.findRoute(source, destination);

        if (route.isEmpty()) {
            response.put("message", "No route found");
        } else {
            response.put("message", "Route found");
            response.put("stations", route);
            response.put("totalStations", route.size());

            //  Include expected keys for frontend
            response.put("lines", List.of("Red")); // Replace with real lines data
            response.put("totalTime", "30 minutes");
            response.put("fare", 20);
            response.put("interchange", null); // or "XYZ Station" if any
        }

        return response;
    }
}
