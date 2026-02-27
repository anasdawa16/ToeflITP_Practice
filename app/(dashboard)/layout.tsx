import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | ToeflMaster ITP",
    template: "%s | ToeflMaster ITP",
  },
};

/**
 * (dashboard) Route Group Layout
 * Wraps all authenticated pages with the full sidebar/topbar shell.
 */
export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
