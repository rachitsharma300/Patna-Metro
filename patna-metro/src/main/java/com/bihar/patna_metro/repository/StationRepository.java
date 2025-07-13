package com.bihar.patna_metro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.bihar.patna_metro.model.Station;

public interface StationRepository extends MongoRepository<Station, String> {
    // Custom queries can be added later
}
