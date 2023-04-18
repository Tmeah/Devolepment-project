const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Replace the following with your actual database credentials
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "incidents",
};

const connection = mysql.createConnection(dbConfig);

app.post("/api/incidents", (req, res) => {
  const {
    chemical,
    date,
    location,
    description,
    action,
    scale,
    duration,
    port_shore,
    wind_speed,
    wind_direction,
    weather,
  } = req.body;

  const query = `
    INSERT INTO incidents (
      chemical, date, location, description, action, scale,
      duration, port_shore, wind_speed, wind_direction, weather
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    chemical,
    date,
    location,
    description,
    action,
    scale,
    duration,
    port_shore,
    wind_speed,
    wind_direction,
    weather,
  ];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error("Error while inserting data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

app.get("/api/incidents", (req, res) => {
  const query = "SELECT * FROM incidents";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error while fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Increase the header size limit
const server = http.createServer(
  {
    maxHeaderSize: 81920, // Increase the header size limit (in bytes)
  },
  app
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
