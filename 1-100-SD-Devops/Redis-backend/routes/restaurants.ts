import express from "express";
import { validate } from "../middleware/validate";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurants";

const router = express.Router();

router.post("/",validate(RestaurantSchema), async(req, res) => {
    const data = req.body as Restaurant;
    res.send("Hello world");
})

export default router;