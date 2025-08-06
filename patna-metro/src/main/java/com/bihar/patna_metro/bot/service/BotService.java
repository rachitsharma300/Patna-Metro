package com.bihar.patna_metro.bot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.RouteFinderService;
import com.bihar.patna_metro.service.FareService;
import com.bihar.patna_metro.service.EstimatedTimeService;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class BotService {

    @Autowired
    private RouteFinderService routeFinderService;

    @Autowired
    private FareService fareService;

    @Autowired
    private EstimatedTimeService timeService;

    public Map<String, Object> processVoiceCommand(String voiceText) {
        // 1. Extract stations from voice input
        String[] stations = extractStationsFromVoice(voiceText);
        String source = stations[0];
        String destination = stations[1];

        // 2. Get route using existing services
        List<Station> route = routeFinderService.findRoute(source, destination);
        int fare = fareService.calculateFare(source, destination);
        int time = timeService.calculateEstimatedTime(source, destination);

        // 3. Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("voiceResponse", buildHindiResponse(source, destination, route, fare, time));
        response.put("route", route);
        response.put("fare", fare);
        response.put("time", time);

        return response;
    }

    private String[] extractStationsFromVoice(String text) {
        // Simple parsing logic
        if (text.contains("se")) {
            String[] parts = text.split("se");
            return new String[]{
                    parts[0].trim().replace(" jana hai", ""),
                    parts[1].trim().replace(" jana hai", "")
            };
        }
        return new String[]{"Patna Junction", "PMCH"}; // Default fallback
    }

    private String buildHindiResponse(String source, String dest,
                                      List<Station> route, int fare, int time) {
        if (route == null || route.isEmpty()) {
            return "माफ कीजिए, इस मार्ग की जानकारी उपलब्ध नहीं है";
        }

        String line = route.get(0).getLine();
        StringBuilder response = new StringBuilder()
                .append("आपको ").append(source).append(" से ").append(dest)
                .append(" जाने के लिए ").append(line).append(" लाइन की मेट्रो लेनी होगी। ");

        if (hasInterchange(route)) {
            response.append(findInterchange(route)).append(" पर मेट्रो बदलनी होगी। ");
        }

        return response.append("कुल समय: ").append(time)
                .append(" मिनट, किराया: ₹").append(fare)
                .append(". आपकी यात्रा शुभ हो!")
                .toString();
    }

    private boolean hasInterchange(List<Station> route) {
        return route.stream().map(Station::getLine).distinct().count() > 1;
    }

    private String findInterchange(List<Station> route) {
        String firstLine = route.get(0).getLine();
        for (Station station : route) {
            if (!station.getLine().equals(firstLine)) {
                return station.getName();
            }
        }
        return "Patna Junction";
    }
}