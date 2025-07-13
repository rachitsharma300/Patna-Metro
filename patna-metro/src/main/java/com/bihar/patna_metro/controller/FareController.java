package com.bihar.patna_metro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bihar.patna_metro.service.FareService;

@RestController
@RequestMapping("/api")
public class FareController {

    @Autowired
    private FareService fareService;

    @GetMapping("/fare")
    public double getFare(@RequestParam String source, @RequestParam String destination) {
        return fareService.calculateFare(source, destination);
    }
//
//    @GetMapping("/estimated-time")
//    public double getEstimatedTime(@RequestParam String source, @RequestParam String destination) {
//        return fareService.calculateEstimatedTime(source, destination);
//    }
}
