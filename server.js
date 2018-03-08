var express = require("express");
var bodyParser = require("body-parser");
var cookie = require('cookie-session');
var passport = require('passport');

var PORT = process.env.PORT || 8000;

var app = express();

// add models for syncing
var db = require("./models");

// serve static content for the app and set up body-parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
var key = require('./config/keys.js');

// set up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
require('./services/passport');

app.use(
  cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [key.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./controllers/itemsController.js")(app);
require("./controllers/usersController.js")(app);
require("./controllers/authController.js")(app);

// sync sequelize models and start the server listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});