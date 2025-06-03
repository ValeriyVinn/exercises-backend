const express = require("express");
const cors = require("cors");
const app = express();

const vanillaRoutes = require("./server/routes/vanilla");
const reactRoutes = require("./server/routes/react");
const htmlCssRoutes = require("./server/routes/html-css");
const menuRoute = require("./server/routes/menu");

app.use(cors());
app.use(express.json());

app.use("/api/vanilla", vanillaRoutes);
// можна додати інші:
app.use("/api/react", reactRoutes);
app.use("/api/html-css", htmlCssRoutes);
app.use("/api/menu", menuRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
