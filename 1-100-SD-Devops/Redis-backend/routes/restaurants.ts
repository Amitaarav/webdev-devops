import express from "express";
import type { Request } from "express";
import { validate } from "../middleware/validate";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurants";
import { initializeRedisClient } from "../utils/client";
import { nanoid } from "nanoid";
import { restaurantKeyById } from "../utils/key";
import { successResponse } from "../utils/responses";
import { checkRestaurantExists } from "../middleware/checkRestaurantId";
const router = express.Router();

router.post("/",validate(RestaurantSchema), async(req, res, next) => {
    const data = req.body as Restaurant;

    try {
        const client = await initializeRedisClient();
        const id = nanoid(); // create new restaurant id
        const restuarantKey = restaurantKeyById(id) // find reastaurant by Id
        const hashData = {id, name: data.name, location: data.location};
        const addResult = await client.hSet(restuarantKey, hashData);

        console.log(`Added ${addResult} fields`);

        return successResponse(res, hashData, "Aded new restaurant")
    } catch (error) {
        console.log(`error: `, error)
        next(error)
    }
})

router.get("/:restaurantId", checkRestaurantExists,  async(req: Request<{ restaurantId: string }>, res, next) => {
    const { restaurantId } = req.params;
    try {
        const client = await initializeRedisClient();
        const restaurantKey = restaurantKeyById(restaurantId)
        const [viewCount, restaurant]= await Promise.all([
            client.hIncrBy(restaurantKey, "viewCount", 1), 
            client.hGetAll(restaurantKey)
        ]);
        return successResponse(res, restaurant);
    } catch (error) {
        next(error)
    }
})

export default router;