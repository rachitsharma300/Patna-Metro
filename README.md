<p align="center">
  <img src="https://github.com/user-attachments/assets/48e4e3fd-ac1e-4a05-8da4-8e2e13262eb7" alt="Your Image" width="1000" height="1000" />
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

<h3>Configure MongoDB</h3>

<p>Update application.properties:</p>

```
spring.data.mongodb.uri=mongodb://localhost:27017/patnametro
```

<h3>Build & Run</h3>

<p>Using Maven:</p>

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

<h3> Bot workflow</h3>

<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns:xlink="http://www.w3.org/1999/xlink" aria-roledescription="sequence" role="graphics-document document" viewBox="-50 -10 1035 441" style="max-width: 100%;" xmlns="http://www.w3.org/2000/svg" width="100%" id="mermaid-svg-15" height="100%"><g><rect class="actor actor-bottom" ry="3" rx="3" name="MongoDB" height="65" width="150" stroke="#666" fill="#eaeaea" y="355" x="785"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="387.5" x="860"><tspan dy="0" x="860">MongoDB</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="Spring Boot" height="65" width="150" stroke="#666" fill="#eaeaea" y="355" x="585"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="387.5" x="660"><tspan dy="0" x="660">Spring Boot</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="Bot.jsx" height="65" width="150" stroke="#666" fill="#eaeaea" y="355" x="300"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="387.5" x="375"><tspan dy="0" x="375">Bot.jsx</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="User" height="65" width="150" stroke="#666" fill="#eaeaea" y="355" x="0"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="387.5" x="75"><tspan dy="0" x="75">User</tspan></text></g><g><line name="MongoDB" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="355" x2="860" y1="65" x1="860" id="actor50"></line><g id="root-50"><rect class="actor actor-top" ry="3" rx="3" name="MongoDB" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="785"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="860"><tspan dy="0" x="860">MongoDB</tspan></text></g></g><g><line name="Spring Boot" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="355" x2="660" y1="65" x1="660" id="actor49"></line><g id="root-49"><rect class="actor actor-top" ry="3" rx="3" name="Spring Boot" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="585"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="660"><tspan dy="0" x="660">Spring Boot</tspan></text></g></g><g><line name="Bot.jsx" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="355" x2="375" y1="65" x1="375" id="actor48"></line><g id="root-48"><rect class="actor actor-top" ry="3" rx="3" name="Bot.jsx" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="300"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="375"><tspan dy="0" x="375">Bot.jsx</tspan></text></g></g><g><line name="User" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="355" x2="75" y1="65" x1="75" id="actor47"></line><g id="root-47"><rect class="actor actor-top" ry="3" rx="3" name="User" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="0"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="75"><tspan dy="0" x="75">User</tspan></text></g></g><style>#mermaid-svg-15{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-svg-15 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-svg-15 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-svg-15 .error-icon{fill:#a44141;}#mermaid-svg-15 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-svg-15 .edge-thickness-normal{stroke-width:1px;}#mermaid-svg-15 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-svg-15 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-svg-15 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-svg-15 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-svg-15 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-svg-15 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-svg-15 .marker.cross{stroke:lightgrey;}#mermaid-svg-15 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-svg-15 p{margin:0;}#mermaid-svg-15 .actor{stroke:#ccc;fill:#1f2020;}#mermaid-svg-15 text.actor&gt;tspan{fill:lightgrey;stroke:none;}#mermaid-svg-15 .actor-line{stroke:#ccc;}#mermaid-svg-15 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#mermaid-svg-15 .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#mermaid-svg-15 #arrowhead path{fill:lightgrey;stroke:lightgrey;}#mermaid-svg-15 .sequenceNumber{fill:black;}#mermaid-svg-15 #sequencenumber{fill:lightgrey;}#mermaid-svg-15 #crosshead path{fill:lightgrey;stroke:lightgrey;}#mermaid-svg-15 .messageText{fill:lightgrey;stroke:none;}#mermaid-svg-15 .labelBox{stroke:#ccc;fill:#1f2020;}#mermaid-svg-15 .labelText,#mermaid-svg-15 .labelText&gt;tspan{fill:lightgrey;stroke:none;}#mermaid-svg-15 .loopText,#mermaid-svg-15 .loopText&gt;tspan{fill:lightgrey;stroke:none;}#mermaid-svg-15 .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#mermaid-svg-15 .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#mermaid-svg-15 .noteText,#mermaid-svg-15 .noteText&gt;tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#mermaid-svg-15 .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-svg-15 .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-svg-15 .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#mermaid-svg-15 .actorPopupMenu{position:absolute;}#mermaid-svg-15 .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-svg-15 .actor-man line{stroke:#ccc;fill:#1f2020;}#mermaid-svg-15 .actor-man circle,#mermaid-svg-15 line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#mermaid-svg-15 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g></g><defs><symbol height="24" width="24" id="computer"><path d="M2 2v13h20v-13h-20zm18 11h-16v-9h16v9zm-10.228 6l.466-1h3.524l.467 1h-4.457zm14.228 3h-24l2-6h2.104l-1.33 4h18.45l-1.297-4h2.073l2 6zm-5-10h-14v-7h14v7z" transform="scale(.5)"></path></symbol></defs><defs><symbol clip-rule="evenodd" fill-rule="evenodd" id="database"><path d="M12.258.001l.256.004.255.005.253.008.251.01.249.012.247.015.246.016.242.019.241.02.239.023.236.024.233.027.231.028.229.031.225.032.223.034.22.036.217.038.214.04.211.041.208.043.205.045.201.046.198.048.194.05.191.051.187.053.183.054.18.056.175.057.172.059.168.06.163.061.16.063.155.064.15.066.074.033.073.033.071.034.07.034.069.035.068.035.067.035.066.035.064.036.064.036.062.036.06.036.06.037.058.037.058.037.055.038.055.038.053.038.052.038.051.039.05.039.048.039.047.039.045.04.044.04.043.04.041.04.04.041.039.041.037.041.036.041.034.041.033.042.032.042.03.042.029.042.027.042.026.043.024.043.023.043.021.043.02.043.018.044.017.043.015.044.013.044.012.044.011.045.009.044.007.045.006.045.004.045.002.045.001.045v17l-.001.045-.002.045-.004.045-.006.045-.007.045-.009.044-.011.045-.012.044-.013.044-.015.044-.017.043-.018.044-.02.043-.021.043-.023.043-.024.043-.026.043-.027.042-.029.042-.03.042-.032.042-.033.042-.034.041-.036.041-.037.041-.039.041-.04.041-.041.04-.043.04-.044.04-.045.04-.047.039-.048.039-.05.039-.051.039-.052.038-.053.038-.055.038-.055.038-.058.037-.058.037-.06.037-.06.036-.062.036-.064.036-.064.036-.066.035-.067.035-.068.035-.069.035-.07.034-.071.034-.073.033-.074.033-.15.066-.155.064-.16.063-.163.061-.168.06-.172.059-.175.057-.18.056-.183.054-.187.053-.191.051-.194.05-.198.048-.201.046-.205.045-.208.043-.211.041-.214.04-.217.038-.22.036-.223.034-.225.032-.229.031-.231.028-.233.027-.236.024-.239.023-.241.02-.242.019-.246.016-.247.015-.249.012-.251.01-.253.008-.255.005-.256.004-.258.001-.258-.001-.256-.004-.255-.005-.253-.008-.251-.01-.249-.012-.247-.015-.245-.016-.243-.019-.241-.02-.238-.023-.236-.024-.234-.027-.231-.028-.228-.031-.226-.032-.223-.034-.22-.036-.217-.038-.214-.04-.211-.041-.208-.043-.204-.045-.201-.046-.198-.048-.195-.05-.19-.051-.187-.053-.184-.054-.179-.056-.176-.057-.172-.059-.167-.06-.164-.061-.159-.063-.155-.064-.151-.066-.074-.033-.072-.033-.072-.034-.07-.034-.069-.035-.068-.035-.067-.035-.066-.035-.064-.036-.063-.036-.062-.036-.061-.036-.06-.037-.058-.037-.057-.037-.056-.038-.055-.038-.053-.038-.052-.038-.051-.039-.049-.039-.049-.039-.046-.039-.046-.04-.044-.04-.043-.04-.041-.04-.04-.041-.039-.041-.037-.041-.036-.041-.034-.041-.033-.042-.032-.042-.03-.042-.029-.042-.027-.042-.026-.043-.024-.043-.023-.043-.021-.043-.02-.043-.018-.044-.017-.043-.015-.044-.013-.044-.012-.044-.011-.045-.009-.044-.007-.045-.006-.045-.004-.045-.002-.045-.001-.045v-17l.001-.045.002-.045.004-.045.006-.045.007-.045.009-.044.011-.045.012-.044.013-.044.015-.044.017-.043.018-.044.02-.043.021-.043.023-.043.024-.043.026-.043.027-.042.029-.042.03-.042.032-.042.033-.042.034-.041.036-.041.037-.041.039-.041.04-.041.041-.04.043-.04.044-.04.046-.04.046-.039.049-.039.049-.039.051-.039.052-.038.053-.038.055-.038.056-.038.057-.037.058-.037.06-.037.061-.036.062-.036.063-.036.064-.036.066-.035.067-.035.068-.035.069-.035.07-.034.072-.034.072-.033.074-.033.151-.066.155-.064.159-.063.164-.061.167-.06.172-.059.176-.057.179-.056.184-.054.187-.053.19-.051.195-.05.198-.048.201-.046.204-.045.208-.043.211-.041.214-.04.217-.038.22-.036.223-.034.226-.032.228-.031.231-.028.234-.027.236-.024.238-.023.241-.02.243-.019.245-.016.247-.015.249-.012.251-.01.253-.008.255-.005.256-.004.258-.001.258.001zm-9.258 20.499v.01l.001.021.003.021.004.022.005.021.006.022.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.023.018.024.019.024.021.024.022.025.023.024.024.025.052.049.056.05.061.051.066.051.07.051.075.051.079.052.084.052.088.052.092.052.097.052.102.051.105.052.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.048.144.049.147.047.152.047.155.047.16.045.163.045.167.043.171.043.176.041.178.041.183.039.187.039.19.037.194.035.197.035.202.033.204.031.209.03.212.029.216.027.219.025.222.024.226.021.23.02.233.018.236.016.24.015.243.012.246.01.249.008.253.005.256.004.259.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.021.224-.024.22-.026.216-.027.212-.028.21-.031.205-.031.202-.034.198-.034.194-.036.191-.037.187-.039.183-.04.179-.04.175-.042.172-.043.168-.044.163-.045.16-.046.155-.046.152-.047.148-.048.143-.049.139-.049.136-.05.131-.05.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.053.083-.051.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.05.023-.024.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.023.01-.022.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.127l-.077.055-.08.053-.083.054-.085.053-.087.052-.09.052-.093.051-.095.05-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.045-.118.044-.12.043-.122.042-.124.042-.126.041-.128.04-.13.04-.132.038-.134.038-.135.037-.138.037-.139.035-.142.035-.143.034-.144.033-.147.032-.148.031-.15.03-.151.03-.153.029-.154.027-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.01-.179.008-.179.008-.181.006-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.006-.179-.008-.179-.008-.178-.01-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.027-.153-.029-.151-.03-.15-.03-.148-.031-.146-.032-.145-.033-.143-.034-.141-.035-.14-.035-.137-.037-.136-.037-.134-.038-.132-.038-.13-.04-.128-.04-.126-.041-.124-.042-.122-.042-.12-.044-.117-.043-.116-.045-.113-.045-.112-.046-.109-.047-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.05-.093-.052-.09-.051-.087-.052-.085-.053-.083-.054-.08-.054-.077-.054v4.127zm0-5.654v.011l.001.021.003.021.004.021.005.022.006.022.007.022.009.022.01.022.011.023.012.023.013.023.015.024.016.023.017.024.018.024.019.024.021.024.022.024.023.025.024.024.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.052.11.051.114.051.119.052.123.05.127.051.131.05.135.049.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.044.171.042.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.022.23.02.233.018.236.016.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.012.241-.015.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.048.139-.05.136-.049.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.051.051-.049.023-.025.023-.024.021-.025.02-.024.019-.024.018-.024.017-.024.015-.023.014-.023.013-.024.012-.022.01-.023.01-.023.008-.022.006-.022.006-.022.004-.021.004-.022.001-.021.001-.021v-4.139l-.077.054-.08.054-.083.054-.085.052-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.044-.118.044-.12.044-.122.042-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.035-.143.033-.144.033-.147.033-.148.031-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.009-.179.009-.179.007-.181.007-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.007-.179-.007-.179-.009-.178-.009-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.031-.146-.033-.145-.033-.143-.033-.141-.035-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.04-.126-.041-.124-.042-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.051-.093-.051-.09-.051-.087-.053-.085-.052-.083-.054-.08-.054-.077-.054v4.139zm0-5.666v.011l.001.02.003.022.004.021.005.022.006.021.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.024.018.023.019.024.021.025.022.024.023.024.024.025.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.051.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.043.171.043.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.021.23.02.233.018.236.017.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.013.241-.014.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.049.139-.049.136-.049.131-.051.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.049.023-.025.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.022.01-.023.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.153l-.077.054-.08.054-.083.053-.085.053-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.048-.105.048-.106.048-.109.046-.111.046-.114.046-.115.044-.118.044-.12.043-.122.043-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.034-.143.034-.144.033-.147.032-.148.032-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.024-.161.024-.162.023-.163.023-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.01-.178.01-.179.009-.179.007-.181.006-.182.006-.182.004-.184.003-.184.001-.185.001-.185-.001-.184-.001-.184-.003-.182-.004-.182-.006-.181-.006-.179-.007-.179-.009-.178-.01-.176-.01-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.023-.162-.023-.161-.024-.159-.024-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.032-.146-.032-.145-.033-.143-.034-.141-.034-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.041-.126-.041-.124-.041-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.048-.105-.048-.102-.048-.1-.05-.097-.049-.095-.051-.093-.051-.09-.052-.087-.052-.085-.053-.083-.053-.08-.054-.077-.054v4.153zm8.74-8.179l-.257.004-.254.005-.25.008-.247.011-.244.012-.241.014-.237.016-.233.018-.231.021-.226.022-.224.023-.22.026-.216.027-.212.028-.21.031-.205.032-.202.033-.198.034-.194.036-.191.038-.187.038-.183.04-.179.041-.175.042-.172.043-.168.043-.163.045-.16.046-.155.046-.152.048-.148.048-.143.048-.139.049-.136.05-.131.05-.126.051-.123.051-.118.051-.114.052-.11.052-.106.052-.101.052-.096.052-.092.052-.088.052-.083.052-.079.052-.074.051-.07.052-.065.051-.06.05-.056.05-.051.05-.023.025-.023.024-.021.024-.02.025-.019.024-.018.024-.017.023-.015.024-.014.023-.013.023-.012.023-.01.023-.01.022-.008.022-.006.023-.006.021-.004.022-.004.021-.001.021-.001.021.001.021.001.021.004.021.004.022.006.021.006.023.008.022.01.022.01.023.012.023.013.023.014.023.015.024.017.023.018.024.019.024.02.025.021.024.023.024.023.025.051.05.056.05.06.05.065.051.07.052.074.051.079.052.083.052.088.052.092.052.096.052.101.052.106.052.11.052.114.052.118.051.123.051.126.051.131.05.136.05.139.049.143.048.148.048.152.048.155.046.16.046.163.045.168.043.172.043.175.042.179.041.183.04.187.038.191.038.194.036.198.034.202.033.205.032.21.031.212.028.216.027.22.026.224.023.226.022.231.021.233.018.237.016.241.014.244.012.247.011.25.008.254.005.257.004.26.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.022.224-.023.22-.026.216-.027.212-.028.21-.031.205-.032.202-.033.198-.034.194-.036.191-.038.187-.038.183-.04.179-.041.175-.042.172-.043.168-.043.163-.045.16-.046.155-.046.152-.048.148-.048.143-.048.139-.049.136-.05.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.05.051-.05.023-.025.023-.024.021-.024.02-.025.019-.024.018-.024.017-.023.015-.024.014-.023.013-.023.012-.023.01-.023.01-.022.008-.022.006-.023.006-.021.004-.022.004-.021.001-.021.001-.021-.001-.021-.001-.021-.004-.021-.004-.022-.006-.021-.006-.023-.008-.022-.01-.022-.01-.023-.012-.023-.013-.023-.014-.023-.015-.024-.017-.023-.018-.024-.019-.024-.02-.025-.021-.024-.023-.024-.023-.025-.051-.05-.056-.05-.06-.05-.065-.051-.07-.052-.074-.051-.079-.052-.083-.052-.088-.052-.092-.052-.096-.052-.101-.052-.106-.052-.11-.052-.114-.052-.118-.051-.123-.051-.126-.051-.131-.05-.136-.05-.139-.049-.143-.048-.148-.048-.152-.048-.155-.046-.16-.046-.163-.045-.168-.043-.172-.043-.175-.042-.179-.041-.183-.04-.187-.038-.191-.038-.194-.036-.198-.034-.202-.033-.205-.032-.21-.031-.212-.028-.216-.027-.22-.026-.224-.023-.226-.022-.231-.021-.233-.018-.237-.016-.241-.014-.244-.012-.247-.011-.25-.008-.254-.005-.257-.004-.26-.001-.26.001z" transform="scale(.5)"></path></symbol></defs><defs><symbol height="24" width="24" id="clock"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" transform="scale(.5)"></path></symbol></defs><defs><marker orient="auto-start-reverse" markerHeight="12" markerWidth="12" markerUnits="userSpaceOnUse" refY="5" refX="7.9" id="arrowhead"><path d="M -1 0 L 10 5 L 0 10 z"></path></marker></defs><defs><marker refY="4.5" refX="4" orient="auto" markerHeight="8" markerWidth="15" id="crosshead"><path style="stroke-dasharray: 0, 0;" d="M 1,2 L 6,7 M 6,2 L 1,7" stroke-width="1pt" stroke="#000000" fill="none"></path></marker></defs><defs><marker orient="auto" markerHeight="28" markerWidth="20" refY="7" refX="15.5" id="filled-head"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker></defs><defs><marker orient="auto" markerHeight="40" markerWidth="60" refY="15" refX="15" id="sequencenumber"><circle r="6" cy="15" cx="15"></circle></marker></defs><text style="font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="80" x="224">Clicks Bot → "Patna Jn to PMCH"</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="119" x2="371" y1="119" x1="76"></line><text style="font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="134" x="516">POST /bot/route {source, dest}</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="173" x2="656" y1="173" x1="376"></line><text style="font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="188" x="759">Fetch route data</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="227" x2="856" y1="227" x1="661"></line><text style="font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="242" x="519">{route, fare, time}</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="281" x2="379" y1="281" x1="659"></line><text style="font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="296" x="227">Shows formatted response</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="335" x2="79" y1="335" x1="374"></line></svg>![deepseek_mermaid_20250805_985f6e](
<h3>Future Enhancements</h3>
 <p>Graph-based route finding (Dijkstra/BFS)</p>

<h3>Contributing</h3>
<p>Contributions are welcome! Please create issues or pull requests to suggest improvements or new features.</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/48e4e3fd-ac1e-4a05-8da4-8e2e13262eb7" alt="Your Image" />
</p>
