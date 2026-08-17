import type { Request, Response, NextFunction} from "express";
import { errorResponse } from "../utils/responses";
import { initializeRedisClient } from "../utils/client";
import { restaurantKeyById } from "../utils/key";

export const checkRestaurantExists = async(req: Request, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params;
    if(!restaurantId){
        return errorResponse(res, 400, "Restaurant ID not found");
    }

    const client = await initializeRedisClient();
    // @ts-ignore
    const restaurantKey = restaurantKeyById(restaurantId);
    const exists = await client.exists(restaurantKey);

    if(!exists){
        return errorResponse(res, 404, "Restaurant Not Found");
    }

    next();
}