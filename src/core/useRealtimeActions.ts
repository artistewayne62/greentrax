import { toast } from "sonner";

/**
 * Simulated Realtime Actions for GreenTrax.OS
 * This replaces the old Supabase logic with internal system triggers.
 */
export const RealtimeActions = {
  // Triggered when a Ranger logs a sighting
  logFieldEvent: (unitId: string, event: string) => {
    console.log(`[SYSTEM LOG]: ${unitId} - ${event}`);
    toast.info(`FIELD LOG: ${unitId}`, {
      description: event,
      className: "border-primary/50 bg-slate-950 font-mono text-[10px]",
    });
  },

  // Triggered by Ops Commander
  dispatchEmergency: (sector: string) => {
    toast.error("EMERGENCY DISPATCH", {
      description: `All units moving to Sector ${sector}.`,
      duration: 5000,
      className: "border-red-500 bg-black text-red-500 font-bold",
    });
  },

  // Triggered for Paid Visitors
  pushAnalystUpdate: (message: string) => {
    toast("ANALYST INTEL", {
      description: message,
      icon: "🛰️",
      className: "border-emerald-500/50 bg-slate-900 text-emerald-400",
    });
  }
};