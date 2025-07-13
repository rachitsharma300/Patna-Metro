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
			// 🟥 Red Line Stations
			repository.save(new Station(null, "Danapur Cantonment", "Red Line", 25.6340, 85.0464));
			repository.save(new Station(null, "Saguna Mor", "Red Line", 25.6123, 85.0972));
			repository.save(new Station(null, "RPS Mor", "Red Line", 25.6128, 85.1233));
			repository.save(new Station(null, "Patliputra", "Red Line", 25.6136, 85.1352));
			repository.save(new Station(null, "Rukanpura", "Red Line", 25.6115, 85.1456));
			repository.save(new Station(null, "Raja Bazar", "Red Line", 25.6098, 85.1567));
			repository.save(new Station(null, "Patna Zoo", "Red Line", 25.6082, 85.1665));
			repository.save(new Station(null, "Vikas Bhawan", "Red Line", 25.6065, 85.1763));
			repository.save(new Station(null, "Vidyut Bhawan", "Red Line", 25.6049, 85.1861));
			repository.save(new Station(null, "Patna Junction", "Red Line", 25.6009, 85.1471));
			repository.save(new Station(null, "CNLU", "Red Line", 25.5900, 85.1300));
			repository.save(new Station(null, "Mithapur", "Red Line", 25.5800, 85.1200));
			repository.save(new Station(null, "Ramkrishna Nagar", "Red Line", 25.5700, 85.1100));
			repository.save(new Station(null, "Jahanpura", "Red Line", 25.5600, 85.1000));
			repository.save(new Station(null, "Khemni Chak", "Red Line", 25.5500, 85.0900));

			// 🟦 Blue Line Stations
			repository.save(new Station(null, "Akashvani", "Blue Line", 25.6110, 85.1442));
			repository.save(new Station(null, "Gandhi Maidan", "Blue Line", 25.6125, 85.1378));
			repository.save(new Station(null, "PMCH", "Blue Line", 25.6090, 85.1355));
			repository.save(new Station(null, "University", "Blue Line", 25.6150, 85.1320));
			repository.save(new Station(null, "Moin-ul-Haq Stadium", "Blue Line", 25.6000, 85.1250));
			repository.save(new Station(null, "Rajendra Nagar", "Blue Line", 25.5950, 85.1150));
			repository.save(new Station(null, "Malahi Pakri", "Blue Line", 25.5850, 85.1050));
			repository.save(new Station(null, "Bhootnath", "Blue Line", 25.5750, 85.0950));
			repository.save(new Station(null, "Zero Mile", "Blue Line", 25.6000, 85.1000));
			repository.save(new Station(null, "New ISBT", "Blue Line", 25.5900, 85.0850));
		};
	}
}
