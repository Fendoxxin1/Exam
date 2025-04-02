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
const educenterprogramRoutes = require("./routes/educenterprogram.routes");
const studyProgramRoutes = require("./routes/studyprogram.routes");
const { connectDb, db } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const Subject = require("./routes/subject.routes");
const uploads = require("./routes/uploads.routes");
const path = require("path");
const sessionRoutes = require("./routes/session.routes");
const userEnrolmentRoutes = require("./routes/courseRegistration.routes");
const logger = require("./middleware/logger");
const excelRoutes = require("./routes/exel.routes");

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
        // url: "https://perpetual-heart-production.up.railway.app/api",
        url: "http://13.127.148.74:3000/api",
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

app.use(logger);
app.use("/api", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api", FilialRoutes);
app.use("/api", ProfessionRoutes);
app.use("/api", studyProgramRoutes);
app.use("/api", learningCenter);
app.use("/api", educenterprogramRoutes);
app.use("/api", Subject);
app.use("/api/", uploads);
app.use("/api", sessionRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/userenrolments", userEnrolmentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb();

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => console.log(`Server started on port 3000`));
