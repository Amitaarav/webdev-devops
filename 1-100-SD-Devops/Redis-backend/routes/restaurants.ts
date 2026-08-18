import express from "express";
import type { Request } from "express";
import { validate } from "../middleware/validate";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurants";
import { initializeRedisClient } from "../utils/client";
import { nanoid } from "nanoid";
import { restaurantKeyById, reviewDetailsKeyById, reviewKeyById } from "../utils/key";
import { successResponse } from "../utils/responses";
import { checkRestaurantExists } from "../middleware/checkRestaurantId";
import { ReviewSchema, type Review } from "../schemas/review";
import { errorResponse } from "../utils/responses";

const router = express.Router();

router.post("/",validate(RestaurantSchema), async(req, res, next) => {
    const data = req.body as Restaurant;

    try {
        const client = await initializeRedisClient();
        const id = nanoid(); // create new restaurant id
        const restuarantKey = restaurantKeyById(id) // find reastaurant by Id
        const hashData = {id, name: data.name, location: data.location};
        const addResult = await client.hSet(restuarantKey, hashData);

        return successResponse(res, hashData, "Aded new restaurant")
    } catch (error) {
        console.log(`error: `, error)
        next(error)
    }
})

router.post("/:restaurantId/reviews", checkRestaurantExists, validate(ReviewSchema),  async(req: Request<{restaurantId: string}>, res, next) => {
    const { restaurantId } = req.params;
    const data = req.body as Review;
    try{
        const client = await initializeRedisClient();
        const reviewId = nanoid();
        const reviewKey = reviewKeyById(restaurantId);
        const reviewDetailsKey = reviewDetailsKeyById(reviewId);
        const reviewData = {
            id: reviewId,
            ...data,
            timestamp: Date.now(),
            restaurantId
        };

        await Promise.all([
            client.lPush(reviewKey, reviewId),
            client.hSet(reviewDetailsKey, reviewData)
        ])

        return successResponse(res, reviewData, "Review Added Successfully");
    }catch(error){
        next(error)
    }
})

router.get("/:restaurantId/reviews", checkRestaurantExists, async (req: Request<{restaurantId: string}>, res, next) => {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10} = req.query;
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit) - 1;

    try{
        const client = await initializeRedisClient();
        const reviewKey = reviewKeyById(restaurantId);
        const reviewIds = await client.lRange(reviewKey, start, end);
        const reviews = await Promise.all(
            reviewIds.map((id) => client.hGetAll(reviewDetailsKeyById(id)))
        )
        console.log("review:", reviews)
        return successResponse(res, reviews);
    } catch (error) {
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

router.delete("/:restaurantId/reviews/:reviewId", checkRestaurantExists, async(req: Request<{restaurantId: string, reviewId: string }>, res, next)=>{
    const { restaurantId, reviewId } = req.params;
    try{
        const client = await initializeRedisClient();
        const reviewKey = reviewKeyById(restaurantId);
        const reviewDetailsKey = reviewDetailsKeyById(reviewId);

        const [ reviewResult, deleteResult ] = await Promise.all([
            client.lRem(reviewKey, 0, reviewId),
            client.del(reviewDetailsKey)
        ])

        if(reviewResult === 0 && deleteResult === 0){
            return errorResponse(res, 404, "Review not found");
        }

        return successResponse(res, reviewId, "Review deleted successfully")
    }catch(error){
        next(error)
    }
})

export default router;