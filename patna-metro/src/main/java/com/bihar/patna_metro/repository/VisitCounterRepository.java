package com.bihar.patna_metro.repository;

import com.bihar.patna_metro.model.VisitCounter;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VisitCounterRepository
        extends MongoRepository<VisitCounter, String> {
}
