package com.bihar.patna_metro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;

@SpringBootApplication
public class PatnaMetroApplication {

	public static void main(String[] args) {
		SpringApplication.run(PatnaMetroApplication.class, args);
	}

	@Bean
	CommandLineRunner dataSeeder(StationRepository repository) {
		return args -> {
			// Clean DB first { Clean Older data in Db  }
			repository.deleteAll();

			// Red Line Stations
			saveStation(repository, "Danapur Cantonment", "Red Line", 25.6340, 85.0464, 1);
			saveStation(repository, "Saguna Mor", "Red Line", 25.6123, 85.0972, 2);
			saveStation(repository, "RPS Mor", "Red Line", 25.6128, 85.1233, 3);
			saveStation(repository, "Patliputra", "Red Line", 25.6136, 85.1352, 4);
			saveStation(repository, "Rukanpura", "Red Line", 25.6115, 85.1456, 5);
			saveStation(repository, "Raja Bazar", "Red Line", 25.6098, 85.1567, 6);
			saveStation(repository, "Patna Zoo", "Red Line", 25.6082, 85.1665, 7);
			saveStation(repository, "Vikas Bhawan", "Red Line", 25.6065, 85.1763, 8);
			saveStation(repository, "Vidyut Bhawan", "Red Line", 25.6049, 85.1861, 9);
			saveStation(repository, "Patna Junction", "Red Line", 25.6009, 85.1471, 10); // interchange
			saveStation(repository, "CNLU", "Red Line", 25.5900, 85.1300, 11);
			saveStation(repository, "Mithapur", "Red Line", 25.5800, 85.1200, 12);
			saveStation(repository, "Ramkrishna Nagar", "Red Line", 25.5700, 85.1100, 13);
			saveStation(repository, "Jaganpura", "Red Line", 25.5600, 85.1050, 14);
			saveStation(repository, "Khemni Chak", "Red Line", 25.5500, 85.0900, 15); // interchange

			// Blue Line Stations
			saveStation(repository, "New ISBT", "Blue Line", 25.5900, 85.0850, 1);
			saveStation(repository, "Zero Mile", "Blue Line", 25.6000, 85.1000, 2);
			saveStation(repository, "Bhootnath", "Blue Line", 25.5750, 85.0950, 3);
			saveStation(repository, "Malahi Pakri", "Blue Line", 25.5850, 85.1050, 4);
			saveStation(repository, "Rajendra Nagar", "Blue Line", 25.5950, 85.1150, 5);
			saveStation(repository, "Moin-ul-Haq Stadium", "Blue Line", 25.6000, 85.1250, 6);
			saveStation(repository, "University", "Blue Line", 25.6150, 85.1320, 7);
			saveStation(repository, "PMCH", "Blue Line", 25.6090, 85.1355, 8);
			saveStation(repository, "Gandhi Maidan", "Blue Line", 25.6125, 85.1378, 9);
			saveStation(repository, "Akashvani", "Blue Line", 25.6110, 85.1442, 10);
			saveStation(repository, "Khemni Chak", "Blue Line", 25.5500, 85.0900, 11); // interchange
			saveStation(repository, "Patna Junction", "Blue Line", 25.6009, 85.1471, 12); // interchange
		};
	}

	private void saveStation(StationRepository repository, String name, String line, double lat, double lon, int seq) {
		repository.save(new Station(null, name, line, lat, lon, seq));
	}
}
