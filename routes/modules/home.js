const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

//瀏覽全部餐廳
router.get("/", (req, res) => {
  Restaurants.find()
    .lean()
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((error) => console.log(error));
});

//搜尋keyword
router.get("/search", (req, res) => {
  Restaurants.find()
    .lean()
    .then((restaurant) => {
      const FilterRestaurant = restaurant.filter(
        (data) =>
          data.name
            .toLowerCase()
            .trim()
            .includes(req.query.keyword.toLowerCase().trim()) ||
          data.category
            .toLowerCase()
            .trim()
            .includes(req.query.keyword.toLowerCase().trim())
      );

      res.render("index", { restaurants: FilterRestaurant });
    });
});

module.exports = router;
