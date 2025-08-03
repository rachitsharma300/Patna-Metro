package com.bihar.patna_metro.controller;

import com.bihar.patna_metro.model.BotQueryRequest;
import com.bihar.patna_metro.model.BotResponse;
import com.bihar.patna_metro.service.BotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bot")
@CrossOrigin(origins = "*") // adjust for frontend if needed
public class BotController {

    @Autowired
    private BotService botService;

    @PostMapping("/query")
    public BotResponse handleBotQuery(@RequestBody BotQueryRequest request) {
        return botService.generateResponse(request.getMessage());
    }
}
