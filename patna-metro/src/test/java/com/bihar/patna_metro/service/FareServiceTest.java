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
 * Unit tests for FareService
 * Fare is calculated based on PASSING STATIONS (slab based)
 */
@ExtendWith(MockitoExtension.class)
class FareServiceTest {

    @Mock
    private RouteFinderService routeFinderService;

    @InjectMocks
    private FareService fareService;

    private Station stationA;
    private Station stationB;
    private Station stationC;
    private Station stationD;
    private Station stationE;

    @BeforeEach
    void setup() {

        stationA = new Station(); stationA.setName("A");
        stationB = new Station(); stationB.setName("B");
        stationC = new Station(); stationC.setName("C");
        stationD = new Station(); stationD.setName("D");
        stationE = new Station(); stationE.setName("E");
    }

    @Test
    void shouldReturnMinimumFareWhenNoRouteFound() {

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(List.of());

        int fare = fareService.calculateFare("A", "B");

        assertEquals(15, fare);
    }

    @Test
    void shouldReturnMinimumFareWhenSourceAndDestinationAreSame() {

        when(routeFinderService.findRoute("A", "A"))
                .thenReturn(List.of(stationA));

        int fare = fareService.calculateFare("A", "A");

        assertEquals(15, fare);
    }

    @Test
    void shouldReturnMinimumFareForShortRoute() {

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(List.of(stationA, stationB)); // 1 passing

        int fare = fareService.calculateFare("A", "B");

        assertEquals(15, fare);
    }

    @Test
    void shouldReturnMediumFareForModerateRoute() {

        when(routeFinderService.findRoute("A", "D"))
                .thenReturn(List.of(stationA, stationB, stationC, stationD)); // 3 passing

        int fare = fareService.calculateFare("A", "D");

        assertEquals(20, fare);
    }

    @Test
    void shouldReturnMaxFareForLongRoute() {

        when(routeFinderService.findRoute("A", "E"))
                .thenReturn(List.of(
                        stationA, stationB, stationC, stationD, stationE,
                        new Station()
                )); // 5 passing

        int fare = fareService.calculateFare("A", "E");

        assertEquals(30, fare);
    }
}
