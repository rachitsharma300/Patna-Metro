package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.service.VisitCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class VisitCounterController {

    @Autowired
    private VisitCounterService service;

    // Call this on site load
    @PostMapping("/visit")
    public void recordVisit() {
        service.increment();
    }

    // (Optional) to see count
    @GetMapping("/visit/count")
    public long getCount() {
        return service.getCount();
    }
}