package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.model.BotResponse;
import com.bihar.patna_metro.util.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class BotService {

    @Autowired
    private RouteService routeService;

    public BotResponse generateResponse(String message) {
        // Extract station names
        List<Station> allStations = routeService.getAllStations();
        String from = null, to = null;

        for (Station station : allStations) {
            String name = station.getName().toLowerCase();
            if (message.toLowerCase().contains(name)) {
                if (from == null) {
                    from = station.getName();
                } else if (!from.equalsIgnoreCase(station.getName())) {
                    to = station.getName();
                    break;
                }
            }
        }

        if (from == null || to == null) {
            return new BotResponse("कृपया दो मेट्रो स्टेशन का नाम दें, जैसे 'मुझे पटना जंक्शन से न्यू ISBT जाना है'");
        }

        // Calculate route, time, fare, interchanges
        String routeInfo = routeService.findShortestRouteWithDetails(from, to);

        // Build reply
        StringBuilder reply = new StringBuilder();
        reply.append("आपको ").append(from).append(" से ").append(to).append(" तक जाने के लिए:\n\n");
        reply.append(routeInfo).append("\n");
        reply.append("आपका सफर सुरक्षित और सुखद हो! 😊");

        return new BotResponse(reply.toString());
    }
}
