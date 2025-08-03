package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.RouteQueryRequest;
import com.bihar.patna_metro.service.VoiceBotRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VoiceBotController {

    @Autowired
    private VoiceBotRouteService routeService;

    @PostMapping("/route")
    public Map<String, Object> getRoute(@RequestBody RouteQueryRequest request) {
        return routeService.findRoute(request.getSource(), request.getDestination());
    }
}
