import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import z from "zod";
import { ordersTable, outboxTable } from "./db/schema.js";
import { db } from "./db/db.js";
import { eq } from "drizzle-orm";
import id from "zod/v4/locales/id.js";

const app = new Hono()

app.post("/orders", 
    zValidator("json", z.object({
        item: z.string(),
        quantity: z.number().int().positive(),

    })),
    async(c) => {
        try {
        const { item, quantity } = c.req.valid("json");
        // DB Transaction
        await db.transaction( async(tx) => {
            await tx.insert(ordersTable).values({
                item,
                quantity
            })
        });

        console.log(`Received order: ${item} (quantity: ${quantity})`);
        return c.json({ message: "Order received" });
        } catch (error) {
            console.error("Error processing order:", error);
            return c.json({ message: "Failed to process order" }, 500);
        }
    }
)

// cancel order endpoint
app.post("/orders/:id/cancel",
    zValidator('param', z.object({
        id: z.string().uuid()
    }))
    , async(c) => {
    const { id } = c.req.param();
    try {
        const orders = await db.transaction( async(tx) => {
            await tx.update(ordersTable)
                .set({ status: 'CANCELLED' })
                .where(eq(ordersTable.id, id))
                .returning();
                if(orders.length === 0) {
                    throw new Error("Order not found");
                }

                await tx.insert(outboxTable).values({
                    event_type: "CANCELLED",
                    payload: JSON.stringify({ orderId: id, timestamp: Date.now() }),
                    created_at: Date.now()
                });
        });
       
        console.log(`Cancelled order with ID: ${id}`);
        return c.json({ message: "Order cancelled" });
    } catch (error) {
        console.error("Error cancelling order:", error);
        return c.json({ message: "Failed to cancel order" }, 500);
    }
});


export default app;