package com.bihar.patna_metro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    /**
     * Get all stations ordered by sequenceNumber ascending
     * @return list of stations
     */
    public List<Station> getAllStations() {
        return stationRepository.findAllByOrderBySequenceNumberAsc();
    }

    /**
     * Save station if not already exists
     * @param station Station to save
     * @return saved or existing station
     */
    public Station saveStation(Station station) {
        Optional<Station> existing = stationRepository.findByName(station.getName());
        if (existing.isPresent()) {
            return existing.get(); // prevents duplicate save
        }
        return stationRepository.save(station);
    }
}
