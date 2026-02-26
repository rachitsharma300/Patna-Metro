package com.bihar.patna_metro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.bihar.patna_metro.model.Route;

public interface RouteRepository extends MongoRepository<Route, String> {
    // { Custom queries if needed }
}
