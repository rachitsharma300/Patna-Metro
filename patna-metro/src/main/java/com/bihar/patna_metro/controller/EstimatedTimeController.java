package com.bihar.patna_metro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bihar.patna_metro.service.EstimatedTimeService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/estimated-time")
public class EstimatedTimeController {

    @Autowired
    private EstimatedTimeService estimatedTimeService;

    @GetMapping
    public Map<String, Object> getEstimatedTime(@RequestParam String source, @RequestParam String destination) {
        double time = estimatedTimeService.calculateEstimatedTime(source, destination);

        Map<String, Object> response = new HashMap<>();
        response.put("source", source);
        response.put("destination", destination);
        response.put("estimated_time_minutes", Math.round(time * 100.0) / 100.0);

        return response;
    }
}
