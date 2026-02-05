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

        Station s1 = new Station(); s1.setName("A");
        Station s2 = new Station(); s2.setName("B");

        List<Station> stations = List.of(s1, s2); // 1 passing

        when(routeFinderService.findRoute("A", "B"))
                .thenReturn(stations);

        Map<String, String> request = Map.of(
                "source", "A",
                "destination", "B"
        );

        mockMvc.perform(post("/api/route")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Route found"))
                .andExpect(jsonPath("$.totalStations").value(1))
                .andExpect(jsonPath("$.stations").isArray());
    }
}
