const express = require("express");

const resourceRoutes = require("./routes/resources.routes");
const likeRoutes = require("./routes/likes.routes");
const commentRoutes = require("./routes/comments.routes");
const categoryRoutes = require("./routes/resourceCategories.routes");
const regionRoutes = require("./routes/regions.routes");
const {connectDb, db} = require("./config/db");

const app = express();
app.use(express.json());

app.use("/api/resources", resourceRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/regions", regionRoutes);

connectDb()

app.listen(3000, () => console.log(`Server started on port 3000`));