package com.bihar.patna_metro.bot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bot")
@CrossOrigin(origins = "http://localhost:5173")
public class BotController {

    @Autowired
    private RouteFinderService routeFinderService;

    @Autowired
    private FareService fareService;

    @Autowired
    private EstimatedTimeService timeService;

    @PostMapping("/voice-route")
    public Map<String, Object> handleVoiceRoute(@RequestBody Map<String, String> request) {
        String source = request.get("source");
        String destination = request.get("destination");

        // Get route details
        List<Station> route = routeFinderService.findRoute(source, destination);

        // Calculate fare and time using the same services as your main app
        int fare = fareService.calculateFare(source, destination);
        int time = timeService.calculateEstimatedTime(source, destination);

        // Prepare response matching your main app's format
        return Map.of(
                "voiceResponse", buildHindiResponse(source, destination, route, fare, time),
                "route", route,
                "fare", fare,
                "time", time,
                "interchange", findInterchange(route),
                "totalStations", route != null ? route.size() : 0,
                "lines", getLines(route)
        );
    }

    private String buildHindiResponse(String source, String dest,
                                      List<Station> route, int fare, int time) {
        if (route == null || route.isEmpty()) {
            return "माफ कीजिए, इस मार्ग की जानकारी उपलब्ध नहीं है";
        }

        List<String> lines = getLines(route);
        String line = String.join(" और ", lines);

        StringBuilder response = new StringBuilder()
                .append("आपको ").append(source).append(" से ").append(dest)
                .append(" जाने के लिए ").append(line).append(" लाइन की मेट्रो लेनी होगी। ");

        String interchange = findInterchange(route);
        if (interchange != null) {
            response.append(interchange).append(" पर मेट्रो बदलनी होगी। ");
        }

        return response.append("कुल समय: ").append(time)
                .append(" मिनट, किराया: ₹").append(fare)
                .append(", स्टेशन: ").append(route.size())
                .append(". आपकी यात्रा शुभ हो!")
                .toString();
    }

    private List<String> getLines(List<Station> route) {
        if (route == null) return Collections.emptyList();
        return route.stream()
                .map(Station::getLine)
                .distinct()
                .collect(Collectors.toList());
    }

    private String findInterchange(List<Station> route) {
        if (route == null || route.size() < 2) return null;
        String firstLine = route.get(0).getLine();
        Optional<Station> interchangeStation = route.stream()
                .filter(s -> !s.getLine().equals(firstLine))
                .findFirst();

        return interchangeStation.isPresent() ? interchangeStation.get().getName() : null;
    }
}