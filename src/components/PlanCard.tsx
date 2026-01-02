import { type Plan } from "@shared/routes";
import { useCreateOrder } from "@/hooks/use-plans";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Cpu, HardDrive, MemoryStick, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface PlanCardProps {
  plan: Plan;
  region: string;
  isPending: boolean;
}

export function PlanCard({ plan, region, isPending }: PlanCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createOrder, isPending: isCreating } = useCreateOrder();

  const handleOrder = () => {
    createOrder(
      { planName: plan.name, price: plan.price, region },
      { onSuccess: () => setIsOpen(false) }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <CardHeader className="text-center pb-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
          <div className="mt-2 text-4xl font-black text-primary drop-shadow-sm">
            {plan.price}
          </div>
        </CardHeader>

        <CardContent className="flex-grow pt-6">
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <MemoryStick className="w-4 h-4" />
              </div>
              <span className="font-medium">RAM: {plan.ram}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-medium">CPU: {plan.cpu}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <HardDrive className="w-4 h-4" />
              </div>
              <span className="font-medium">Storage: {plan.storage}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-medium">Slots: {plan.slots}</span>
            </li>
          </ul>
        </CardContent>

        <Separator className="bg-white/5 mb-6 mx-6 w-auto" />

        <CardFooter>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                className={`w-full h-12 text-lg font-arabic font-bold transition-all duration-300 ${
                  isPending 
                    ? "bg-amber-500/80 hover:bg-amber-500 cursor-not-allowed text-white" 
                    : "bg-primary hover:bg-blue-600 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                }`}
                disabled={isPending}
              >
                {isPending ? "قيد انتظار قبول طلبك" : "طلب الباقة"}
              </Button>
            </DialogTrigger>
            
            <DialogContent className="bg-slate-900 border-white/10 font-arabic text-right max-w-md" dir="rtl">
              <DialogHeader className="text-right space-y-3">
                <DialogTitle className="text-2xl text-center">هل أنت متأكد؟</DialogTitle>
                <DialogDescription className="text-base text-slate-300 bg-slate-800/50 p-4 rounded-lg border border-white/5">
                  <strong>الملاحظات قبل الطلب على الباقة:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-2 text-sm leading-relaxed">
                    <li>أول ما تشتري الباقة بياخذ وقت عشان يجيك السيرفر لمدة شهر في الإيميل حقك</li>
                    <li>مافي ترجيع، يعني يوم تاخذ الباقة وتغير رأيك ما نقدر نرجعها</li>
                    <li>إن شاء الله تعجبك الباقة مع كل تحياتنا</li>
                  </ol>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex gap-2 sm:gap-2 justify-center mt-4 flex-row-reverse">
                <Button 
                  onClick={handleOrder} 
                  disabled={isCreating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-10 font-bold"
                >
                  {isCreating ? "جاري الطلب..." : "نعم"}
                </Button>
                <DialogClose asChild>
                  <Button variant="secondary" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white h-10 font-bold">
                    لا
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
