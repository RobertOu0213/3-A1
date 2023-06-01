const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Restaurants = require("../restaurants");
const User = require("../user");
const restaurantList = require("./restaurant.json").results;

const SEED_USER1 = {
  email: "user1@example.com",
  password: "12345678",
};

const SEED_USER2 = {
  email: "user2@example.com",
  password: "12345678",
};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER1.password, salt))
    .then((hash) =>
      User.create([
        {
          email: SEED_USER1.email,
          password: hash,
        },
        {
          email: SEED_USER2.email,
          password: hash,
        },
      ])
    )
    .then((user) => {
      const restaurantUser1 = [];
      for (let i = 0; i < 3; i++) {
        const userId = user[0]._id;
        restaurantList[i].userId = userId;
        restaurantUser1.push(restaurantList[i]);
      }

      const restaurantUser2 = [];
      for (let i = 3; i < 6; i++) {
        const userId = user[1]._id;
        restaurantList[i].userId = userId;
        restaurantUser2.push(restaurantList[i]);
      }

      const restaurant = restaurantUser1.concat(restaurantUser2);

      return Restaurants.create(restaurant);
    })
    // .then((user) => {
    //   console.log(user);
    //   const restaurant = [];
    //   for (let i = 3; i < 6; i++) {
    //     const userId = user[1]._id;
    //     restaurantList[i].userId = userId;
    //     restaurant.push(restaurantList[i]);
    //   }
    //   return Restaurants.create(restaurant);
    // })
    .then(() => {
      console.log("done.");
      process.exit();
    });
});
