import { Outlet } from "react-router-dom";
import ADminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/*admin header */}
        <ADminHeader setOpen={setOpenSidebar} />
        <main className="felx flex-1 bg-muted/40 pd-4 md:pd-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;