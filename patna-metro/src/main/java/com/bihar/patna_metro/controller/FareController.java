package com.bihar.patna_metro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bihar.patna_metro.service.FareService;

@RestController
@RequestMapping("/api/fare")
public class FareController {

    @Autowired
    private FareService fareService;

    @GetMapping
    public double getFare(@RequestParam String source, @RequestParam String destination) {
        return fareService.calculateFare(source, destination);
    }
}