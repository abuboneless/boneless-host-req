import { useState } from "react";
import { usePlans, useOrders } from "@/hooks/use-plans";
import { PlanCard } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Box, Server, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [region, setRegion] = useState<"asia" | "eu">("asia");
  const { data: plansData, isLoading: isLoadingPlans } = usePlans();
  const { data: ordersData } = useOrders();

  const plans = plansData?.[region] || [];

  // Check if there's a pending order
  const pendingPlanName = ordersData?.find(o => o.status === "pending")?.planName;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-display overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <Box className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-blue-400 transition-colors">
              Boneless
            </span>
          </div>

          <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setRegion("asia")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                region === "asia"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Asia
            </button>
            <button
              onClick={() => setRegion("eu")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                region === "eu"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Europe
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Minecraft-Aesthetic-Wallpaper-HD-Free-download.jpg"
            alt="Minecraft Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-arabic mb-6 drop-shadow-2xl">
              اختيار الباقة
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-arabic max-w-2xl mx-auto leading-relaxed opacity-90">
              اختر الباقة المناسبة لسيرفر ماين كرافت الخاص بك واستمتع بأداء لا مثيل له
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex justify-center gap-8 text-slate-400"
          >
            <div className="flex flex-col items-center gap-2">
              <Server className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-medium">Global Locations</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PLANS GRID */}
      <section className="container mx-auto px-4 -mt-24 pb-24 relative z-20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
            Available Plans
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
        </div>

        {isLoadingPlans ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-xl border border-white/5 bg-slate-900/50 p-6 space-y-4">
                <Skeleton className="h-8 w-1/2 bg-white/5 mx-auto" />
                <Skeleton className="h-12 w-1/3 bg-white/5 mx-auto" />
                <div className="space-y-3 pt-8">
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.name} 
                plan={plan} 
                region={region}
                isPending={pendingPlanName === plan.name}
              />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Box className="w-5 h-5" />
            <span className="font-bold text-lg">Boneless Hosts</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Boneless Hosts. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
