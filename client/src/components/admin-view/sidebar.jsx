import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex text-lg cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <menuItem.icon />
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="mt-5 flex gap-2">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSidebar;
