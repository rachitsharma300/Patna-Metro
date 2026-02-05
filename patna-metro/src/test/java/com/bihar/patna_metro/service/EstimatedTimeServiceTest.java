package com.bihar.patna_metro.service;

import com.bihar.patna_metro.model.Station;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Unit tests for EstimatedTimeService
 * Time is calculated based on PASSING stations
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

        stationA = new Station(); stationA.setName("A");
        stationB = new Station(); stationB.setName("B");
        stationC = new Station(); stationC.setName("C");
    }

    @Test
    void shouldReturnZeroTimeWhenSourceAndDestinationAreSame() {

        when(routeFinderService.findRoute("A", "A"))
                .thenReturn(List.of(stationA));

        int time = estimatedTimeService.calculateEstimatedTime("A", "A");

        assertEquals(0, time);
    }

    @Test
    void shouldCalculateTimeBasedOnPassingStations() {

        when(routeFinderService.findRoute("A", "C"))
                .thenReturn(List.of(stationA, stationB, stationC)); // 2 passing

        int time = estimatedTimeService.calculateEstimatedTime("A", "C");

        assertEquals(5, time); // 2 × 2.5 = 5
    }

    @Test
    void shouldReturnZeroWhenNoRouteFound() {

        when(routeFinderService.findRoute("X", "Y"))
                .thenReturn(List.of());

        int time = estimatedTimeService.calculateEstimatedTime("X", "Y");

        assertEquals(0, time);
    }
}
