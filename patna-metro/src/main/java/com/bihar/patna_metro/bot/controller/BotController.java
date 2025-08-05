package com.bihar.patna_metro.bot.controller;

import com.bihar.patna_metro.bot.dto.BotRequest;
import com.bihar.patna_metro.bot.dto.BotResponse;
import com.bihar.patna_metro.bot.service.BotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bot")
public class BotController {

    @Autowired
    private BotService botService;

    @PostMapping("/route")
    public BotResponse getRoute(@RequestBody BotRequest request) {
        return botService.process(request);
    }
}