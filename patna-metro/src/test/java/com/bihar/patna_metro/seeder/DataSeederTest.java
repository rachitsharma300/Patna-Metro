package com.bihar.patna_metro.seeder;

import com.bihar.patna_metro.repository.StationRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.*;

class DataSeederTest {

    @Test
    void testRun() throws Exception {
        // Arrange
        StationRepository repository = Mockito.mock(StationRepository.class);
        DataSeeder dataSeeder = new DataSeeder(repository);

        // Act
        dataSeeder.run();

        // Assert
        verify(repository, times(1)).deleteAll();
        // Approximately total stations inserted (Red + Blue)
        verify(repository, times(27)).save(any());
    }
}
