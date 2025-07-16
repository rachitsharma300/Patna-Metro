package com.bihar.patna_metro.repository;

import com.bihar.patna_metro.model.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StationRepository extends MongoRepository<Station, String> {
    List<Station> findByName(String name);
    List<Station> findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(String line, int start, int end);
}
