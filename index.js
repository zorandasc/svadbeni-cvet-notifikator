const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
var cors = require("cors");

const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

const port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
