const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const routes = require("./routes");
const usePassport = require("./config/passport");

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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
