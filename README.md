# 🚇 Patna Metro Route Finder

![Java](https://img.shields.io/badge/Java-17%2B-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-%2324292e.svg?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 📌 **Project Overview**

Patna Metro Route Finder is a **Java Spring Boot** based backend application to:

- Store all metro stations of Patna Metro (Red Line & Blue Line)
- Find routes between two stations
- Manage station data in MongoDB
- Provide REST APIs for route finding and station listing

---

## 💡 **Features**

✅ REST APIs for CRUD operations on Stations  
✅ Route finding between two stations (line-wise basic implementation)  
✅ MongoDB integration for data persistence  
✅ CommandLineRunner seeder for initial station data  
✅ Extensible architecture for future enhancements (graph-based routes, fares, timings, UI integration)

---

## 🚀 **Tech Stack**

- **Backend:** Java 24, Spring Boot 3.5.3
- **Database:** MongoDB Atlas or Local MongoDB
- **Build Tool:** Maven

---

## 🛠️ **Project Structure**
```
patna-metro/
├── src/
│ ├── main/
│ │ ├── java/com/bihar/patna_metro/
│ │ │ ├── controller/
│ │ │ ├── model/
│ │ │ ├── repository/
│ │ │ ├── service/
│ │ │ └── PatnaMetroApplication.java
│ │ └── resources/
│ │ └── application.properties
└── pom.xml
```

---

## 🔧 **Setup & Run**

1. **Clone the repository**

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


