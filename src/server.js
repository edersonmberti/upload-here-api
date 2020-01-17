const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(routes);

app.use("/", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT, () => {
  console.log("UHUL! The API is UP && RUNNING!!!", process.env.PORT);
});
