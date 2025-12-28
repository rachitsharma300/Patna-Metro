package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for StationService
 * Focus is on repository interaction and duplicate handling
 */
@ExtendWith(MockitoExtension.class)
class StationServiceTest {

    @Mock
    private StationRepository stationRepository;

    @InjectMocks
    private StationService stationService;

    private Station danapurStation;

    @BeforeEach
    void setup() {
        danapurStation = new Station();
        danapurStation.setName("Danapur");
        danapurStation.setLine("Red");
        danapurStation.setSequenceNumber(1);
    }

    @Test
    void shouldReturnAllStations() {

        when(stationRepository.findAll())
                .thenReturn(List.of(danapurStation));

        List<Station> stations = stationService.getAllStations();

        assertEquals(1, stations.size());
        assertEquals("Danapur", stations.get(0).getName());
    }

    @Test
    void shouldSaveStationWhenNotAlreadyPresent() {

        when(stationRepository.findByName("Danapur"))
                .thenReturn(List.of());

        when(stationRepository.save(danapurStation))
                .thenReturn(danapurStation);

        Station savedStation = stationService.saveStation(danapurStation);

        assertNotNull(savedStation);
        assertEquals("Danapur", savedStation.getName());

        verify(stationRepository, times(1)).save(danapurStation);
    }

    @Test
    void shouldReturnExistingStationWhenDuplicateNameFound() {

        Station existingStation = new Station();
        existingStation.setName("Danapur");

        when(stationRepository.findByName("Danapur"))
                .thenReturn(List.of(existingStation));

        Station result = stationService.saveStation(danapurStation);

        assertEquals("Danapur", result.getName());

        // Important: save should NOT be called
        verify(stationRepository, never()).save(any());
    }
}
