const mongoose = require("mongoose");

const keys = require("./config/keys");

module.exports = function () {
  mongoose
    .connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conected to mongodb");
    })
    .catch((error) => {
      console.log("Eroro conecting to mongodb", error);
    });
};
