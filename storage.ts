import { db } from "./db";
import {
  orders,
  type InsertOrder,
  type Order
} from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }
}

export const storage = new DatabaseStorage();
