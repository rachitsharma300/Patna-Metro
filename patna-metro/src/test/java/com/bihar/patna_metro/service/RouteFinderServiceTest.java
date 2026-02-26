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
import static org.mockito.Mockito.when;

/**
 * Unit tests for RouteFinderService
 * Focus is on route selection logic, not DB layer
 */
@ExtendWith(MockitoExtension.class)
class RouteFinderServiceTest {

    @Mock
    private StationRepository stationRepository;

    @InjectMocks
    private RouteFinderService routeFinderService;

    private Station danapurRed;
    private Station phulwariRed;
    private Station patnaJunctionRed;

    private Station patnaJunctionBlue;
    private Station pmchBlue;

    @BeforeEach
    void setup() {

        // Red Line stations
        danapurRed = createStation("Danapur", "Red", 1);
        phulwariRed = createStation("Phulwari", "Red", 2);
        patnaJunctionRed = createStation("Patna Junction", "Red", 3);

        // Blue Line stations
        patnaJunctionBlue = createStation("Patna Junction", "Blue", 1);
        pmchBlue = createStation("PMCH", "Blue", 2);
    }

    @Test
    void shouldReturnEmptyRouteWhenSourceNotFound() {

        when(stationRepository.findByName("Unknown"))
                .thenReturn(List.of());

        List<Station> route = routeFinderService
                .findRoute("Unknown", "PMCH");

        assertTrue(route.isEmpty(),
                "Route should be empty when source station not found");
    }

    @Test
    void shouldReturnDirectRouteWhenSourceAndDestinationOnSameLine() {

        when(stationRepository.findByName("Danapur"))
                .thenReturn(List.of(danapurRed));

        when(stationRepository.findByName("Phulwari"))
                .thenReturn(List.of(phulwariRed));

        when(stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                "Red", 1, 2))
                .thenReturn(List.of(danapurRed, phulwariRed));

        List<Station> route = routeFinderService
                .findRoute("Danapur", "Phulwari");

        assertEquals(2, route.size());
        assertEquals("Danapur", route.get(0).getName());
        assertEquals("Phulwari", route.get(1).getName());
    }

    @Test
    void shouldReturnRouteWithInterchangeForDifferentLines() {

        // Source & destination
        when(stationRepository.findByName("Danapur"))
                .thenReturn(List.of(danapurRed));

        when(stationRepository.findByName("PMCH"))
                .thenReturn(List.of(pmchBlue));

        // Interchange lookup
        when(stationRepository.findByName("Patna Junction"))
                .thenReturn(List.of(patnaJunctionRed, patnaJunctionBlue));

        // Routes to and from interchange
        when(stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                "Red", 1, 3))
                .thenReturn(List.of(danapurRed, phulwariRed, patnaJunctionRed));

        when(stationRepository.findByLineAndSequenceNumberBetweenOrderBySequenceNumberAsc(
                "Blue", 1, 2))
                .thenReturn(List.of(patnaJunctionBlue, pmchBlue));

        List<Station> route = routeFinderService
                .findRoute("Danapur", "PMCH");

        assertFalse(route.isEmpty());
        assertEquals("Danapur", route.get(0).getName());
        assertEquals("PMCH", route.get(route.size() - 1).getName());
    }

    @Test
    void shouldReturnSingleStationWhenSourceAndDestinationSame() {

        when(stationRepository.findByName("Danapur"))
                .thenReturn(List.of(danapurRed));

        List<Station> route = routeFinderService
                .findRoute("Danapur", "Danapur");

        assertEquals(1, route.size());
        assertEquals("Danapur", route.get(0).getName());
    }

    // Helper method to reduce noise in tests
    private Station createStation(String name, String line, int seq) {
        Station station = new Station();
        station.setName(name);
        station.setLine(line);
        station.setSequenceNumber(seq);
        return station;
    }
}
