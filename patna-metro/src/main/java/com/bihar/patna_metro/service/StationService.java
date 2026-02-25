package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    public Station saveStation(Station station) {
        List<Station> existing = stationRepository.findByNameAndLine(station.getName(), station.getLine());
        if (!existing.isEmpty()) {
            return existing.get(0);
        }
        return stationRepository.save(station);
    }
}
