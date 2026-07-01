import { getCategories } from "@/lib/content";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const categories = getCategories();
  return (
    <aside className="sidebar-desktop fixed top-0 left-0 z-40 h-full w-64 flex flex-col bg-white/70 backdrop-blur-xl border-r border-slate-200 text-text overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full">
        <SidebarContent categories={categories} />
      </div>
    </aside>
  );
}
