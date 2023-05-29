const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

//瀏覽新餐廳
router.get("/new", (req, res) => {
  res.render("new");
});

//新增新餐廳
router.post("/", (req, res) => {
  return Restaurants.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//瀏覽特定餐廳
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((error) => console.log(error));
});

//瀏覽編輯餐廳
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

//修改資料
router.put("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurants.findByIdAndUpdate(id, req.body)
    .then((restaurant) => {
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

//刪除資料
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
