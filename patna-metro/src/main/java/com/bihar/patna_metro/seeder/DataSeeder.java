package com.bihar.patna_metro.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final StationRepository repository;

    public DataSeeder(StationRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Clean DB first { Change Before Deploy }
        // repository.deleteAll();

        // Only seed data if the database is empty
        if (repository.count() == 0) {

            // Red Line Stations
            saveStation("Danapur Cantonment", "Red Line", 25.6340, 85.0464, 1);
            saveStation("Saguna Mor", "Red Line", 25.6123, 85.0972, 2);
            saveStation("RPS Mor", "Red Line", 25.6128, 85.1233, 3);
            saveStation("Patliputra", "Red Line", 25.6136, 85.1352, 4);
            saveStation("Rukanpura", "Red Line", 25.6115, 85.1456, 5);
            saveStation("Raja Bazar", "Red Line", 25.6098, 85.1567, 6);
            saveStation("Patna Zoo", "Red Line", 25.6082, 85.1665, 7);
            saveStation("Vikas Bhawan", "Red Line", 25.6065, 85.1763, 8);
            saveStation("Vidyut Bhawan", "Red Line", 25.6049, 85.1861, 9);
            saveStation("Patna Junction", "Red Line", 25.6009, 85.1471, 10); // interchange
            saveStation("CNLU", "Red Line", 25.5900, 85.1300, 11);
            saveStation("Mithapur", "Red Line", 25.5800, 85.1200, 12);
            saveStation("Ramkrishna Nagar", "Red Line", 25.5700, 85.1100, 13);
            saveStation("Jaganpura", "Red Line", 25.5600, 85.1050, 14);
            saveStation("Khemni Chak", "Red Line", 25.5500, 85.0900, 15); // interchange

            // Blue Line Stations
            saveStation("Patna Junction", "Blue Line", 25.6009, 85.1471, 1); // interchange
            saveStation("Akashvani", "Blue Line", 25.6110, 85.1442, 2);
            saveStation("Gandhi Maidan", "Blue Line", 25.6125, 85.1378, 3);
            saveStation("PMCH", "Blue Line", 25.6090, 85.1355, 4);
            saveStation("University", "Blue Line", 25.6150, 85.1320, 5);
            saveStation("Moin-ul-Haq Stadium", "Blue Line", 25.6000, 85.1250, 6);
            saveStation("Rajendra Nagar", "Blue Line", 25.5950, 85.1150, 7);
            saveStation("Malahi Pakri", "Blue Line", 25.5850, 85.1050, 8);
            saveStation("Khemni Chak", "Blue Line", 25.5500, 85.0900, 9);
            saveStation("Bhootnath", "Blue Line", 25.5750, 85.0950, 10);
            saveStation("Zero Mile", "Blue Line", 25.6000, 85.1000, 11);
            saveStation("New ISBT", "Blue Line", 25.5900, 85.0850, 12);
        }
    }
    private void saveStation(String name, String line, double lat, double lon, int seq) {
        repository.save(new Station(null, name, line, lat, lon, seq));
    }
}
