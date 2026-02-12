export type UserRole =
  | "visitor_free"
  | "visitor_paid"
  | "analyst"
  | "ranger"
  | "ops";

export const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    visitor_free: "Visitor (Free)",
    visitor_paid: "Visitor (Paid)",
    analyst: "Tactical Analyst",
    ranger: "Field Ranger",
    ops: "Ops Commander"
  };
  return labels[role];
};