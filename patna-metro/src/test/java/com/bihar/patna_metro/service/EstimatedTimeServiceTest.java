package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
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
 * Unit tests for EstimatedTimeService
 * Focus is on time calculation logic, not route finding
 */
@ExtendWith(MockitoExtension.class)
class EstimatedTimeServiceTest {

    @Mock
    private RouteFinderService routeFinderService;

    @InjectMocks
    private EstimatedTimeService estimatedTimeService;

    private Station stationA;
    private Station stationB;
    private Station stationC;

    @BeforeEach
    void setup() {
        // Station A
        stationA = new Station();
        stationA.setName("Danapur");
        stationA.setLatitude(25.58);
        stationA.setLongitude(85.04);
        stationA.setLine("Red");

        // Station B
        stationB = new Station();
        stationB.setName("Phulwari");
        stationB.setLatitude(25.60);
        stationB.setLongitude(85.10);
        stationB.setLine("Red");

        // Station C (Different line → interchange)
        stationC = new Station();
        stationC.setName("PMCH");
        stationC.setLatitude(25.61);
        stationC.setLongitude(85.15);
        stationC.setLine("Blue");
    }

    @Test
    void shouldReturnZeroTimeWhenSourceAndDestinationAreSame() {

        when(routeFinderService.findRoute("Danapur", "Danapur"))
                .thenReturn(List.of(stationA));

        int time = estimatedTimeService
                .calculateEstimatedTime("Danapur", "Danapur");

        assertEquals(0, time, "Same station should return 0 minutes");
    }

    @Test
    void shouldCalculateTimeForValidRouteWithoutInterchange() {

        when(routeFinderService.findRoute("Danapur", "Phulwari"))
                .thenReturn(List.of(stationA, stationB));

        int time = estimatedTimeService
                .calculateEstimatedTime("Danapur", "Phulwari");

        assertTrue(time > 0, "Time should be greater than 0 for valid route");
    }

    @Test
    void shouldAddInterchangePenaltyWhenRouteHasDifferentLines() {

        when(routeFinderService.findRoute("Danapur", "PMCH"))
                .thenReturn(List.of(stationA, stationB, stationC));

        int time = estimatedTimeService
                .calculateEstimatedTime("Danapur", "PMCH");

        assertTrue(time >= 7,
                "Interchange route should include interchange penalty");
    }

    @Test
    void shouldThrowExceptionWhenNoRouteFound() {

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(List.of());

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> estimatedTimeService.calculateEstimatedTime("A", "B")
        );

        assertEquals("No route found between stations", exception.getMessage());
    }
}
