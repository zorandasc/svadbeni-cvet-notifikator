const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
var cors = require("cors");

const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");

//startuj bazu
require("./db")();

app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      "https://deluxe-stroopwafel-bfc24b.netlify.app",
      "https://www.svadbenicvet.com",
    ],
  })
);
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(helmet());
//app.use(compression());

app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

const port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
