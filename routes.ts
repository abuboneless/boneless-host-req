import { z } from 'zod';
import { insertOrderSchema, orders } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// Plan type definition for the API response
export const planSchema = z.object({
  name: z.string(),
  price: z.string(),
  ram: z.string(),
  cpu: z.string(),
  storage: z.string(),
  slots: z.string(),
});

export const api = {
  plans: {
    list: {
      method: 'GET' as const,
      path: '/api/plans',
      responses: {
        200: z.object({
          asia: z.array(planSchema),
          eu: z.array(planSchema)
        }),
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertOrderSchema,
      responses: {
        201: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/orders',
      responses: {
        200: z.array(z.custom<typeof orders.$inferSelect>()),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type Plan = z.infer<typeof planSchema>;
export type PlansResponse = z.infer<typeof api.plans.list.responses[200]>;
