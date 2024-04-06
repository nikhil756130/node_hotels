const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // It's going to save the data at req.body
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send(
    "Welcome to our hotel... "
  );
});

//Import the router file
const personRouters = require('./routes/personRoutes');
const menuItemsRouterd = require('./routes/menuItemsRoutes');

//Use the routers
app.use ('/person', personRouters);
app.use ('/menuItem', menuItemsRouterd);


app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
