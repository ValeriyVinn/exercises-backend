
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// GET /api/menu/:cat — наприклад, /api/menu/html-css
router.get("/:cat", (req, res) => {
  const { cat } = req.params;
  const filePath = path.join(__dirname, "../../menu", `${cat}.json`);


  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(404).json({ error: "Menu not found" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

module.exports = router;
