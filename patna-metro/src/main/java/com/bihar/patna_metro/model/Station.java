package com.bihar.patna_metro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stations")
public class Station {

    @Id
    private String id;
    private String name;
    private String line;
    private double latitude;
    private double longitude;
    private int sequenceNumber;

    public Station() {}

    public Station(String id, String name, String line, double latitude, double longitude, int sequenceNumber) {
        this.id = id;
        this.name = name;
        this.line = line;
        this.latitude = latitude;
        this.longitude = longitude;
        this.sequenceNumber = sequenceNumber;
    }

    // Getters and Setters { Not Need but Spring Auto Gen }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLine() { return line; }
    public void setLine(String line) { this.line = line; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public int getSequenceNumber() { return sequenceNumber; }
    public void setSequenceNumber(int sequenceNumber) { this.sequenceNumber = sequenceNumber; }
}
