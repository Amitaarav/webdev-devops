import express from "express";
import restaurantsRouter from "./routes/restaurants.js"
import cuisinesRouter from "./routes/cuisines.js"
import { errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());

app.use("/api/cuisines", cuisinesRouter);
app.use("/api/restaurants", restaurantsRouter);

app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`Application is running at ${PORT}`)
  })
  .on("error", (error) => {
    throw new Error(error.message);
  })

  // 1-100-SD-Devops