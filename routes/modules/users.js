const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureMessage: true,
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success_msg", "成功登入！");
  }
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!email || !password || !confirmPassword) {
    errors.push({ message: "郵件及密碼必填 " });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      password,
      confirmPassword,
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "此email已註冊過" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已成功登出");
  res.redirect("/users/login");
});

module.exports = router;
