require("dotenv").config();

const express = require("express");
const recipesRoutes = require("./routes/recipes");
const userRecipeRoutes = require("./routes/userRecipes");
const userRoutes = require("./routes/users");
const { default: mongoose } = require("mongoose");

// express app
const app = express();

// express middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Cache control options
const cacheControl = {
  dotfiles: "ignore",
  etag: true,
  maxAge: "30d",
};

app.use(express.static("public", cacheControl));

app.use("/api/recipes", recipesRoutes);
app.use("/api/userRecipes", userRecipeRoutes);
app.use("/api/user", userRoutes);

// listen on PORT
const PORT = process.env.PORT;

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
