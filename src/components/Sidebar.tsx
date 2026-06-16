import { getCategories } from "@/lib/content";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const categories = getCategories();
  return (
    <aside className="sidebar-desktop fixed top-0 left-0 z-40 h-full w-64 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <SidebarContent categories={categories} />
    </aside>
  );
}
