<p align="center">
  <img src="https://github.com/user-attachments/assets/48e4e3fd-ac1e-4a05-8da4-8e2e13262eb7" alt="Your Image" />
</p>
<h1 align="center">🚇 Patna Metro Route Finder</h1>

<p align="center">
<img src= "https://img.shields.io/badge/Java-17%2B-blue.svg" />
<img src= "https://img.shields.io/badge/Spring%20Boot-3.5.3-brightgreen.svg" />
<img src= "https://img.shields.io/badge/MongoDB-%2324292e.svg?logo=mongodb&logoColor=white" />
<img src= "https://img.shields.io/badge/License-MIT-green.svg" />
</p>

<h3>📌 Project Overview</h3>
<p>Patna Metro Route Finder is a Java Spring Boot based backend application that:</p>
<ul>
  <li>Stores all metro stations of Patna Metro (Red Line &amp; Blue Line)</li>
  <li>Finds routes between two stations</li>
  <li>Manages station data in MongoDB</li>
  <li>Provides REST APIs for route finding and station listing</li>
</ul>

<h3>💡 Features</h3>
<ul>
<li>✅ REST APIs for CRUD operations on Stations</li>
<li>✅ Route finding between two stations (line-wise basic implementation)</li>
<li>✅ MongoDB integration for data persistence</li>
<li>✅ CommandLineRunner seeder for initial station data</li>  
<li>✅ Extensible architecture for future enhancements (graph-based routes, fares, timings, UI integration)</li>
</ul>

<h3>🚀 Tech Stack</h3>
<ul>
<li>Backend: Java 24, Spring Boot 3.5.3</li>
<li>Database: MongoDB Atlas or Local MongoDB</li>
<li>Build Tool: Maven</li>
</ul>

<h3>🔧 Setup & Run</h3>
<p>Clone the repository</p>

```bash
git clone https://github.com/yourusername/patna-metro.git
cd patna-metro
```

## **Configure MongoDB**

### Update application.properties:
```
spring.data.mongodb.uri=mongodb://localhost:27017/patnametro
```

Build & Run

Using Maven:
```
mvn spring-boot:run
```

<details> <summary><strong>📁 Patna Metro Backend</strong></summary>
  
  ```
📦 patna-metro
 ┣ 📂 .idea
 ┣ 📂 .mvn
 ┣ 📂 src
 ┃ ┗ 📂 main
 ┃ ┃ ┣ 📂 java
 ┃ ┃ ┃ ┗ 📂 com.bihar.patna_metro
 ┃ ┃ ┃ ┃ ┣ 📂 config
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 CorsConfig
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 MongoConfig
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 SwaggerConfig.java
 ┃ ┃ ┃ ┃ ┣ 📂 controller
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 EstimatedTimeController
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 FareController
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 RouteController
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 StationController
 ┃ ┃ ┃ ┃ ┣ 📂 exception
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 GlobalExceptionHandler
 ┃ ┃ ┃ ┃ ┃ ┗ ⚠️ ResourceNotFoundException
 ┃ ┃ ┃ ┃ ┣ 📂 model
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 Route
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 Station
 ┃ ┃ ┃ ┃ ┣ 📂 repository
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 RouteRepository
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 StationRepository
 ┃ ┃ ┃ ┃ ┣ 📂 seeder
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 DataSeeder
 ┃ ┃ ┃ ┃ ┣ 📂 service
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 EstimatedTimeService
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 FareService
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 RouteFinderService
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 RouteService
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 StationService
 ┃ ┃ ┃ ┃ ┗ 📄 PatnaMetroApplication
 ┃ ┃ ┗ 📂 resources
 ┃ ┃ ┃ ┣ 📂 static
 ┃ ┃ ┃ ┣ 📂 templates
 ┃ ┃ ┃ ┗ 📄 application.properties
 ┃ ┗ 📂 test
 ┃ ┃ ┗ 📂 java
 ┃ ┃ ┃ ┗ 📂 com.bihar.patna_metro
 ┃ ┃ ┃ ┃ ┣ 📂 controller
 ┃ ┃ ┃ ┃ ┣ 📂 seeder
 ┃ ┃ ┃ ┃ ┗ 📄 PatnaMetroApplicationTests
  
  ```
</details>

<details> <summary><strong>📁 Patna Metro Frontend</strong></summary>
  
```
📦 Patna_Metro_Frontend
 ┣ 📂 node_modules
 ┣ 📂 public
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 bot
 ┃ ┃ ┃ ┣ 📄 Bot.jsx
 ┃ ┃ ┃ ┗ 📄 botService.js
 ┃ ┃ ┣ 📂 Journey
 ┃ ┃ ┃ ┣ 📄 JourneySummary.jsx
 ┃ ┃ ┃ ┣ 📄 RouteForm.jsx
 ┃ ┃ ┃ ┗ 📄 RouteStations.jsx
 ┃ ┃ ┣ 📂 metro
 ┃ ┃ ┃ ┣ 📄 InterchangeIcon.jsx
 ┃ ┃ ┃ ┗ 📄 LineBadge.jsx
 ┃ ┃ ┣ 📂 ui
 ┃ ┃ ┃ ┣ 📄 Button.jsx
 ┃ ┃ ┃ ┗ 📄 LanguageSelect.jsx
 ┃ ┃ ┣ 📄 DisclaimerPopup.jsx
 ┃ ┃ ┣ 📄 Footer.jsx
 ┃ ┃ ┣ 📄 Hero.jsx
 ┃ ┃ ┣ 📄 MetroMapModal.jsx
 ┃ ┃ ┣ 📄 MetroTimeline.jsx
 ┃ ┃ ┣ 📄 Navbar.jsx
 ┃ ┃ ┣ 📄 RouteFinder.jsx
 ┃ ┃ ┣ 📄 StationCard.jsx
 ┃ ┃ ┗ 📄 StationTrack.jsx
 ┃ ┣ 📂 locales
 ┃ ┃ ┣ 📄 en.json
 ┃ ┃ ┗ 📄 hi.json
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 legal
 ┃ ┃ ┃ ┣ 📄 PrivacyPolicy.jsx
 ┃ ┃ ┃ ┣ 📄 Sitemap.jsx
 ┃ ┃ ┃ ┗ 📄 TermsOfService.jsx
 ┃ ┃ ┣ 📄 About.jsx
 ┃ ┃ ┣ 📄 FareInfo.jsx
 ┃ ┃ ┣ 📄 Home.jsx
 ┃ ┃ ┣ 📄 MapPage.jsx
 ┃ ┃ ┗ 📄 NotFound.jsx
 ┃ ┣ 📂 services
 ┃ ┃ ┗ 📄 api.js
 ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📄 metroData.js
 ┃ ┃ ┗ 📄 Stations.json
 ┃ ┣ 📄 App.css
 ┃ ┣ 📄 App.jsx
 ┃ ┣ 📄 i18n.js
 ┃ ┣ 📄 index.css
 ┃ ┣ 📄 main.jsx
 ┣ 📄 .gitignore
 ┣ 📄 eslint.config.js
 ┣ 📄 index.html
 ┣ 📄 package-lock.json
 ┣ 📄 package.json
 ┣ 📄 postcss.config.js
 ┣ 📄 README.md
 ┣ 📄 tailwind.config.js
 ┗ 📄 vite.config.js
```

</details>


## 📡 **API Endpoints**
```
| Method | Endpoint                                 | Description                     |
|--------|------------------------------------------|---------------------------------|
| GET    | `/stations`                              | Get all stations                |
| GET    | `/route?source=...&destination=...`      | Find route between two stations |
| POST   | `/stations`                              | Add a new station               |
| PUT    | `/stations/{id}`                         | Update station info             |
| DELETE | `/stations/{id}`                         | Delete a station                |


Note: Current /route API supports same-line routes only. Graph-based route finding for inter-line connectivity is under development.
```
## Future Enhancements
 Graph-based route finding (Dijkstra/BFS)

## Contributing
Contributions are welcome! Please create issues or pull requests to suggest improvements or new features.
<p align="center">
  <img src="https://github.com/user-attachments/assets/48e4e3fd-ac1e-4a05-8da4-8e2e13262eb7" alt="Your Image" />
</p>





