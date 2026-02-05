package com.bihar.patna_metro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "visit_counter")
public class VisitCounter {

    @Id
    private String id;
    private long count;

    public void setId(String id) {
        this.id = id;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public String getId() {
        return id;
    }

    public long getCount() {
        return count;
    }
}
