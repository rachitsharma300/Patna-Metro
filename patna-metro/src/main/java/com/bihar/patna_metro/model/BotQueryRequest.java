package com.bihar.patna_metro.model;

public class BotQueryRequest {
    private String message;

    public BotQueryRequest() {
    }

    public BotQueryRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
