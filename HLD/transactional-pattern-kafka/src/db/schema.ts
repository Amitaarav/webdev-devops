import { pgTable, uuid, integer, varchar, pgEnum} from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum('order_status', [
    'CREATED',
    'PROCESSING',
    'COMPLETED',
    'CANCELLED'
]);

export const ordersTable = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    item: varchar('item', { length: 255}),
    quantity: integer('quantity'),
    status: orderStatusEnum('status').notNull().default('CREATED'),
});

export const outboxTable = pgTable('outbox', {
    id: uuid('id').primaryKey().defaultRandom(),
    event_Type: varchar('event_type', { length: 255}),
    payload: varchar('payload', { length: 1000}),
    created_at: integer('created_at').notNull(),
});