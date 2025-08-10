package com.bihar.patna_metro.seeder;

import com.bihar.patna_metro.repository.StationRepository;
import org.junit.jupiter.api.Disabled; // Optional: To disable a test
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DataSeederTest {

    @Mock
    private StationRepository repository;

    @InjectMocks
    private DataSeeder dataSeeder;

    // Test case 1: When repository is empty, it should seed data
    @Test
    void testRunWhenRepositoryIsEmpty() throws Exception {
        // Arrange
        // Mock the count() method to return 0, simulating an empty repository
        when(repository.count()).thenReturn(0L);

        // Act
        dataSeeder.run();

        // Assert
        // Verify that deleteAll() is NOT called
        verify(repository, never()).deleteAll();
        // Verify that save() is called exactly 27 times
        verify(repository, times(27)).save(any());
    }

    // Test case 2: When repository is NOT empty, it should do nothing
    @Test
    void testRunWhenRepositoryIsNotEmpty() throws Exception {
        // Arrange
        // Mock the count() method to return a value greater than 0
        when(repository.count()).thenReturn(5L);

        // Act
        dataSeeder.run();

        // Assert
        // Verify that deleteAll() is NOT called
        verify(repository, never()).deleteAll();
        // Verify that save() is also NOT called
        verify(repository, never()).save(any());
    }
}