const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const MedicineRoutes = require("./routes/medicineRoutes");
const AuthRoutes = require("./routes/authRoutes");
const User = require("./models/User");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://0.0.0.0:27017/medical_store_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/medicine", MedicineRoutes);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
