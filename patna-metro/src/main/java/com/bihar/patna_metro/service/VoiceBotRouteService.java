package com.bihar.patna_metro.service;

public class VoiceBotRouteService {
}
package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VoiceBotRouteService {

    @Autowired
    private StationRepository stationRepository;

    public Map<String, Object> findRoute(String source, String destination) {
        List<Station> allStations = stationRepository.findAll();
        Station src = null, dest = null;

        for (Station s : allStations) {
            if (s.getName().equalsIgnoreCase(source)) src = s;
            if (s.getName().equalsIgnoreCase(destination)) dest = s;
        }

        Map<String, Object> res = new HashMap<>();

        if (src == null || dest == null) {
            res.put("error", "Station not found");
            return res;
        }

        if (src.getLine().equals(dest.getLine())) {
            // same line
            res.put("lines", List.of(src.getLine()));
            res.put("interchange", null);
        } else {
            // interchange logic (simple example)
            res.put("lines", List.of(src.getLine(), dest.getLine()));
            res.put("interchange", "Kankarbagh"); // TODO: use real interchange logic
        }

        int stationDiff = Math.abs(src.getSequenceNumber() - dest.getSequenceNumber());
        res.put("totalTime", stationDiff * 2 + " मिनट"); // 2 mins/station
        res.put("fare", Math.max(10, stationDiff * 5));   // ₹5 per station, min ₹10

        return res;
    }
}
