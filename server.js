const express = require("express");
const cors = require("cors");
const { seedRouter } = require("./routers/seedRouter");
require("./config/db");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", seedRouter);


app.get("/", (req, res) => {
  return res.status(201).json({success: true, message:"welcome to the server"});
});


// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});

module.exports = app;
