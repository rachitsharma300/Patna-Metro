package com.bihar.patna_metro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

import java.util.List;

@Service
public class EstimatedTimeService {

    @Autowired
    private StationRepository stationRepository;

    /**
     * Calculates estimated travel time between two stations based on station count.
     * Assumes average time per station = 2 mins + 5 mins buffer for interchange.
     * Adjust buffer as per your project data.
     * @return estimated time in minutes
     */
    public int calculateEstimatedTime(String sourceName, String destinationName) {
        List<Station> sourceList = stationRepository.findByName(sourceName);
        List<Station> destinationList = stationRepository.findByName(destinationName);

        if (sourceList.isEmpty() || destinationList.isEmpty()) {
            throw new IllegalArgumentException("Invalid station name");
        }

        Station source = sourceList.get(0);
        Station destination = destinationList.get(0);

        int stationCount = Math.abs(destination.getSequenceNumber() - source.getSequenceNumber()) + 1;

        int averageTimePerStation = 2; // minutes
        int bufferTime = 0;

        // Optional: add buffer if lines are different (interchange)
        if (!source.getLine().equals(destination.getLine())) {
            bufferTime = 5; // interchange time
        }

        return stationCount * averageTimePerStation + bufferTime;
    }
}
