const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const routes = require("./routes");
const port = 3000;
const usePassport = require("./config/passport");

const app = express();

require("./config/mongoose");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
