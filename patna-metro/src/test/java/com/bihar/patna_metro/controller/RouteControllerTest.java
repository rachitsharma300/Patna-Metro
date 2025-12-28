package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.service.RouteFinderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RouteController.class)
class RouteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RouteFinderService routeFinderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldReturnRouteWhenValidSourceAndDestinationProvided() throws Exception {

        // Creating Station objects using setters (matches actual model)
        Station s1 = new Station();
        s1.setName("Danapur");
        s1.setLatitude(25.58);
        s1.setLongitude(85.04);

        Station s2 = new Station();
        s2.setName("PMCH");
        s2.setLatitude(25.61);
        s2.setLongitude(85.15);

        List<Station> stations = List.of(s1, s2);

        when(routeFinderService.findRoute("Danapur", "PMCH"))
                .thenReturn(stations);

        Map<String, String> request = Map.of(
                "source", "Danapur",
                "destination", "PMCH"
        );

        mockMvc.perform(post("/api/route")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Route found"))
                .andExpect(jsonPath("$.totalStations").value(2))
                .andExpect(jsonPath("$.stations").isArray());
    }

    @Test
    void shouldReturnNoRouteMessageWhenServiceReturnsEmptyRoute() throws Exception {

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(List.of());

        Map<String, String> request = Map.of(
                "source", "A",
                "destination", "B"
        );

        mockMvc.perform(post("/api/route")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("No route found"));
    }

    @Test
    void shouldReturnErrorWhenSourceOrDestinationMissing() throws Exception {

        Map<String, String> request = Map.of("source", "Danapur");

        mockMvc.perform(post("/api/route")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.error").value("Source or destination missing"));
    }
}
