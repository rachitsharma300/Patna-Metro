FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the JAR file (make sure to build it first)
COPY target/patna-metro-0.0.1-SNAPSHOT.jar app.jar

# Add these environment variables (or set them in Render)
ENV SPRING_DATA_MONGODB_URI=${SPRING_DATA_MONGODB_URI}
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


## Step 1: Use Eclipse Temurin JDK 21 (LTS)
#FROM eclipse-temurin:21-jdk-alpine
#
## Step 2: Set work directory inside container
#WORKDIR /app
#
## Step 3: Copy JAR file to container
#COPY target/patna-metro-0.0.1-SNAPSHOT.jar app.jar
#
## Step 4: Expose port (same as your Spring Boot app)
#EXPOSE 8080
#
## Step 5: Run JAR file
#ENTRYPOINT ["java", "-jar", "app.jar"]
