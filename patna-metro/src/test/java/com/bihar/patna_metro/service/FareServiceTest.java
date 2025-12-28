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
 * Unit tests for FareService
 * Focus is on fare calculation logic, not route finding
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

    @BeforeEach
    void setup() {

        // Station A
        stationA = new Station();
        stationA.setName("Danapur");
        stationA.setLatitude(25.580);
        stationA.setLongitude(85.040);

        // Station B (close distance)
        stationB = new Station();
        stationB.setName("Phulwari");
        stationB.setLatitude(25.585);
        stationB.setLongitude(85.045);

        // Station C (farther distance)
        stationC = new Station();
        stationC.setName("PMCH");
        stationC.setLatitude(25.610);
        stationC.setLongitude(85.150);
    }

    @Test
    void shouldThrowExceptionWhenNoRouteFound() {

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(List.of());

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> fareService.calculateFare("A", "B")
        );

        assertEquals(
                "No route found between given stations",
                exception.getMessage()
        );
    }

    @Test
    void shouldReturnMinimumFareWhenSourceAndDestinationAreSame() {

        when(routeFinderService.findRoute("Danapur", "Danapur"))
                .thenReturn(List.of(stationA));

        int fare = fareService.calculateFare("Danapur", "Danapur");

        assertEquals(15, fare,
                "Same station travel should return minimum fare");
    }

    @Test
    void shouldReturnMinimumFareForShortDistanceRoute() {

        when(routeFinderService.findRoute("Danapur", "Phulwari"))
                .thenReturn(List.of(stationA, stationB));

        int fare = fareService.calculateFare("Danapur", "Phulwari");

        assertEquals(15, fare,
                "Short distance route should cost minimum fare");
    }

    @Test
    void shouldReturnMediumFareForModerateDistanceRoute() {

        when(routeFinderService.findRoute("Danapur", "PMCH"))
                .thenReturn(List.of(stationA, stationB, stationC));

        int fare = fareService.calculateFare("Danapur", "PMCH");

        assertTrue(fare == 20 || fare == 30,
                "Fare should be calculated based on distance slab");
    }
}
