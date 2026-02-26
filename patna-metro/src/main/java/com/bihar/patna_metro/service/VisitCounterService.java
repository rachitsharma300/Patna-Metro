package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.VisitCounter;
import com.bihar.patna_metro.repository.VisitCounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitCounterService {

    private static final String COUNTER_ID = "GLOBAL_VISIT_COUNT";

    @Autowired
    private VisitCounterRepository repository;

    public void increment() {
        VisitCounter counter = repository.findById(COUNTER_ID)
                .orElseGet(() -> {
                    VisitCounter c = new VisitCounter();
                    c.setId(COUNTER_ID);
                    c.setCount(0);
                    return c;
                });

        counter.setCount(counter.getCount() + 1);
        repository.save(counter);
    }

    public long getCount() {
        return repository.findById(COUNTER_ID)
                .map(VisitCounter::getCount)
                .orElse(0L);
    }
}
