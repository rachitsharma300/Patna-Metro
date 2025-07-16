package com.bihar.patna_metro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "routes")
public class Route {

    @Id
    private String id;
    private String routeName;
    private List<String> stations; // List of station ID / names on this route { queue }
}
