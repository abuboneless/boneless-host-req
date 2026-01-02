import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type PlansResponse, type InsertOrder } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function usePlans() {
  return useQuery({
    queryKey: [api.plans.list.path],
    queryFn: async () => {
      const res = await fetch(api.plans.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch plans");
      return api.plans.list.responses[200].parse(await res.json());
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      const res = await fetch(api.orders.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return api.orders.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }
      
      return api.orders.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
      toast({
        title: "تم استلام الطلب",
        description: `تم طلب باقة ${data.planName} بنجاح`,
        className: "font-arabic text-right",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
        className: "font-arabic text-right",
      });
    }
  });
}
