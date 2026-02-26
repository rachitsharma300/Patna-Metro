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
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend (React) to call this API
public class RouteController {

    @Autowired
    private RouteFinderService routeFinderService;

    /**
     * Finds the metro route between source and destination stations.
     *
     * Input  : { source, destination }
     * Output : Ordered list of stations + passing station count
     */
    @PostMapping
    public Map<String, Object> findRoute(@RequestBody Map<String, String> request) {

        // Extract source & destination from request body
        String source = request.get("source");
        String destination = request.get("destination");

        // Response map sent back to frontend
        Map<String, Object> response = new HashMap<>();

        // Validation: source or destination missing
        if (source == null || destination == null) {
            response.put("error", "Source or destination missing");
            return response;
        }

        // Call service layer to compute the route (ordered stations)
        List<Station> route = routeFinderService.findRoute(source, destination);

        // If no route found between given stations
        if (route.isEmpty()) {
            response.put("message", "No route found");
        }
        // Route found successfully
        else {
            response.put("message", "Route found");

            // Full list of stations in travel order (used for map & station list UI)
            response.put("stations", route);

            // Number of stations PASSED (not including source station)
            // Example: A -> B -> C  => 2 stations passed
            response.put("totalStations", Math.max(route.size() - 1, 0));
        }

        return response;
    }
}
