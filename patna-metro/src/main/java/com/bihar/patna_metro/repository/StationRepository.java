package com.bihar.patna_metro.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.bihar.patna_metro.model.Station;
import java.util.List;

public interface StationRepository extends MongoRepository<Station, String> {

    Optional<Station> findByName(String name);
    List<Station> findAllByOrderBySequenceNumberAsc();
    List<Station> findByLineOrderBySequenceNumberAsc(String line);

    // 🔥 Add this to support route fetching between two sequence numbers on same line
    List<Station> findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(String line, int start, int end);
}
