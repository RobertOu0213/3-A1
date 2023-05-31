const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

//瀏覽新餐廳
router.get("/new", (req, res) => {
  res.render("new");
});

//新增新餐廳
router.post("/", (req, res) => {
  const userId = req.user._id;
  const {
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurants.create({
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//瀏覽特定餐廳
router.get("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((error) => console.log(error));
});

//瀏覽編輯餐廳
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

//修改資料
router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  // Restaurants.findByIdAndUpdate(_id, req.body, userId);
  return Restaurants.findOneAndUpdate({ _id, userId }, req.body)
    .then((restaurant) => {
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error));
});

//刪除資料
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  return Restaurants.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
