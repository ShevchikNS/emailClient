const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const env = require("dotenv");
const exphbs = require("express-handlebars");

//For BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set("views", "./views");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "layout"
  })
);
app.set("view engine", ".hbs");
app.use("/dashboard", function(request, response) {
  // to routes

  response.render("dashboard.hbs", {
    title: "My account",
    email: request.user.email
  });
  app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize");
  });
});

//Models
const models = require("./models");
//Routes
const authRoute = require("./routes/auth.js")(app, passport);
//load passport strategies
require("./lib/passport")(passport, models.user);
//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });
app.listen(5000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Site is live");
  }
});
