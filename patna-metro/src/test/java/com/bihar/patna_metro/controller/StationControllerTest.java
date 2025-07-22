package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.Station;
import com.bihar.patna_metro.repository.StationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StationController.class)
public class StationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StationRepository repository;

    @Test
    void testGetAllStations() throws Exception {
        // Sample data
        Station s1 = new Station(null, "Patna Junction", "Red Line", 25.6, 85.1, 1);
        Station s2 = new Station(null, "Khemni Chak", "Blue Line", 25.5, 85.09, 2);

        // Mock repository behaviour
        when(repository.findAll()).thenReturn(Arrays.asList(s1, s2));

        // Perform GET /stations
        mockMvc.perform(get("/stations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Patna Junction"))
                .andExpect(jsonPath("$[1].name").value("Khemni Chak"));
    }
}
