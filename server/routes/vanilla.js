// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// const DATA_FILE = path.join(
//   __dirname,
//   "../../data/vanilla/01-basics-tasks.json"
// );

// const readData = () => {
//   if (!fs.existsSync(DATA_FILE)) return [];
//   const raw = fs.readFileSync(DATA_FILE, "utf-8");
//   return JSON.parse(raw);
// };

// const writeData = (data) => {
//   fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
// };

// // GET all tasks
// router.get("/", (req, res) => {
//   const data = readData();
//   res.json(data);
// });

// // POST (add or update a task)
// router.post("/", (req, res) => {
//   if (process.env.NODE_ENV === "production") {
//     return res
//       .status(403)
//       .json({ message: "Write access is not allowed in production" });
//   }

//   const { name, statement, solution } = req.body;
//   if (!name || !statement || !solution) {
//     return res.status(400).json({ message: "Invalid data" });
//   }

//   const data = readData();
//   const existing = data.find((task) => task.name === name);

//   if (existing) {
//     existing.statement = statement;
//     existing.solution.push(...solution);
//   } else {
//     data.push({ name, statement, solution });
//   }

//   writeData(data);
//   res.json({ message: "Saved successfully", data });
// });

// module.exports = router;


// router.post("/", (req, res) => {
//   const origin = req.headers.origin;

//   // Дозволити запис лише з локального фронтенда
//   const isLocalRequest =
//     origin === undefined || origin.startsWith("http://localhost");

//   if (process.env.NODE_ENV === "production" || !isLocalRequest) {
//     return res
//       .status(403)
//       .json({ message: "Write access is not allowed from this origin" });
//   }

//   const { name, statement, solution } = req.body;
//   if (!name || !statement || !solution) {
//     return res.status(400).json({ message: "Invalid data" });
//   }

//   const data = readData();
//   const existing = data.find((task) => task.name === name);

//   if (existing) {
//     existing.statement = statement;
//     existing.solution.push(...solution);
//   } else {
//     data.push({ name, statement, solution });
//   }

//   writeData(data);
//   res.json({ message: "Saved successfully", data });
// });


// !-------------------------

const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const getFilePath = (fileKey) =>
  path.join(__dirname, `../../data/vanilla/${fileKey}-tasks.json`);

const readData = (fileKey) => {
  const filePath = getFilePath(fileKey);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

const writeData = (fileKey, data) => {
  const filePath = getFilePath(fileKey);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all tasks from a specific file
router.get("/:fileKey", (req, res) => {
  const { fileKey } = req.params;
  try {
    const data = readData(fileKey);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error reading data", error: err });
  }
});

// POST to a specific file
router.post("/:fileKey", (req, res) => {
  const { fileKey } = req.params;
  const origin = req.headers.origin;
  const isLocalRequest =
    origin === undefined || origin.startsWith("http://localhost");

  if (process.env.NODE_ENV === "production" || !isLocalRequest) {
    return res
      .status(403)
      .json({ message: "Write access is not allowed from this origin" });
  }

  const { name, statement, solution } = req.body;
  if (!name || !statement || !solution) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const data = readData(fileKey);
    const existing = data.find((task) => task.name === name);

    if (existing) {
      existing.statement = statement;
      existing.solution.push(...solution);
    } else {
      data.push({ name, statement, solution });
    }

    writeData(fileKey, data);
    res.json({ message: "Saved successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Error writing data", error: err });
  }
});

module.exports = router;
