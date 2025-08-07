# Step 1: Use Eclipse Temurin JDK 21 (LTS)
FROM eclipse-temurin:21-jdk-alpine

# Step 2: Set work directory inside container
WORKDIR /app

# Step 3: Copy JAR file to container
COPY target/patna-metro-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose port (same as your Spring Boot app)
EXPOSE 8080

# Step 5: Run JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
