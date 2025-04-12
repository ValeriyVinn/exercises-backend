const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "exercises.json");

// Читаємо файл JSON
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

// Запис у файл JSON
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Отримати всі вправи
app.get("/api/exercises", (req, res) => {
  const data = readData();
  res.json(data);
});

// Додати або оновити вправу
app.post("/api/exercises", (req, res) => {
  const { name, statement, solution } = req.body;
  let data = readData();

  const existing = data.find((ex) => ex.name === name);
  if (existing) {
    existing.statement = statement;
    existing.solution.push(...solution);
  } else {
    data.push({ name, statement, solution });
  }

  writeData(data);
  res.json({ message: "Saved successfully", data });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
