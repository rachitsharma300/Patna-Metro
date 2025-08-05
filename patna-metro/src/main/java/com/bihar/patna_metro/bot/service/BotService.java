package com.bihar.patna_metro.bot.service;

import com.bihar.patna_metro.bot.dto.BotRequest;
import com.bihar.patna_metro.bot.dto.BotResponse;
import com.bihar.patna_metro.service.RouteFinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BotService {

    @Autowired
    private RouteFinderService routeFinderService;

    public BotResponse process(BotRequest request) {
        // 1. To Get stations from voice search
        String[] stations = parseStations(request.getVoiceCommand());
        String source = stations[0];
        String destination = stations[1];

        // 2. Use Existing RouteFinderService
        var routeDetails = routeFinderService.findRouteDetails(source, destination);

        // 3. Bot Response
        return BotResponse.builder()
                .hindiText(generateHindiResponse(routeDetails))
                .timeMinutes(routeDetails.getTotalTime())
                .fareRupees(routeDetails.getFare())
                .interchange(routeDetails.getInterchange())
                .build();
    }

    private String[] parseStations(String voiceInput) {
        // Logic: Update stations.json
        return voiceInput.split(" से ");
    }

    private String generateHindiResponse(RouteDetails details) {
        return String.format(
                "आपको %s लाइन की मेट्रो लेनी होगी।%s कुल समय %d मिनट है और किराया ₹%d लगेगा। आपकी यात्रा शुभ हो!",
                String.join(" और ", details.getLines()),
                details.getInterchange() != null ?
                        " आपको " + details.getInterchange() + " पर लाइन बदलनी होगी।" : "",
                details.getTotalTime(),
                details.getFare()
        );
    }
}