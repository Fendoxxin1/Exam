const express = require("express");

const resourceRoutes = require("./routes/resources.routes");
const likeRoutes = require("./routes/likes.routes");
const commentRoutes = require("./routes/comments.routes");
const categoryRoutes = require("./routes/resourceCategories.routes");
const regionRoutes = require("./routes/regions.routes");
const userRoutes = require("./routes/user.routes");
const ProfessionRoutes = require("./routes/profession.routes");
const learningCenter = require("./routes/educationalcenter.routes");
const FilialRoutes = require("./routes/filial.routes");
const lcMajorsRoutes = require("./routes/lcMajors.routes");
const studyProgramRoutes = require("./routes/studyprogram.routes");
const { connectDb, db } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const LcMajors = require("./routes/lcMajors.routes");
const Subject = require("./routes/subject.routes");
// const logger = require("./middleware/logger");

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      version: "1.0.0",
      description: "API documentation for CRUD operations",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// app.use(logger);
app.use("/api", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/filials", FilialRoutes);
app.use("/api", ProfessionRoutes);
app.use("/api", studyProgramRoutes);
app.use("/api", learningCenter);
app.use("/api", lcMajorsRoutes);
app.use("/api", Subject);

connectDb();

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => console.log(`Server started on port 3000`));
