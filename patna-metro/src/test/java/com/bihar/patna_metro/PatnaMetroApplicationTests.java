package com.bihar.patna_metro;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")  // Ye line ADD KARO
class PatnaMetroApplicationTests {
    @Test
    void contextLoads() {
        // Test pass hoga agar Spring context load ho jaye
    }
}