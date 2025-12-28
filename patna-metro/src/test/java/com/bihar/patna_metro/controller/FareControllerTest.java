package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.service.FareService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for FareController
 * Focus is only on request-response mapping, not business logic
 */
@WebMvcTest(FareController.class)
class FareControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FareService fareService;

    @Test
    void shouldReturnFareWhenSourceAndDestinationAreValid() throws Exception {

        // Given: service returns fare for valid route
        when(fareService.calculateFare("Danapur", "PMCH")).thenReturn(20);

        // When & Then: API is called and response is validated
        mockMvc.perform(get("/api/fare")
                        .param("source", "Danapur")
                        .param("destination", "PMCH"))
                .andExpect(status().isOk())
                .andExpect(content().string("20.0"));
    }

    @Test
    void shouldFailWhenSourceParameterIsMissing() throws Exception {

        // Only destination is passed, source is missing
        mockMvc.perform(get("/api/fare")
                        .param("destination", "PMCH"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFailWhenDestinationParameterIsMissing() throws Exception {

        // Only source is passed, destination is missing
        mockMvc.perform(get("/api/fare")
                        .param("source", "Danapur"))
                .andExpect(status().isBadRequest());
    }
}
