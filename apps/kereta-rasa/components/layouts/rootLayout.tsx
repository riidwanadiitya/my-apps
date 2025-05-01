import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { NavGuest } from "@/components/nav-guest";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRootStores } from "@/stores";
import { Badge } from "@workspace/ui/components/badge";

interface ILayout {
  children: ReactNode;
}

const RootLayout = ({ children }: ILayout) => {
  const [totalQty, setTotalQty] = React.useState<number>(0);

  const role: string = "guest";

  const { carts } = useRootStores();

  React.useEffect(() => {
    const qty = carts.reduce((sum, item) => sum + item.qty, 0);
    setTotalQty(qty);
  }, [carts]);

  return (
    <SidebarProvider>
      {role === "admin" && <AppSidebar />}
      <SidebarInset className="relative">
        <header className="h-auto shrink-0 sticky top-0 z-10 bg-black py-2">
          <div className="p-4 flex items-center justify-between">
            {role === "admin" && (
              <>
                <SidebarTrigger className="-ml-1" title="" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </>
            )}
            <Link href={"/home"}>
              <h1 className="text-2xl font-semibold">Kereta Rasa</h1>
            </Link>
            {role === "guest" && <NavGuest />}
            <Link href="/cart">
              <div className="flex gap-2">
                <ShoppingCart /> {totalQty > 0 && <Badge>{totalQty}</Badge>}
              </div>
            </Link>
          </div>
        </header>
        <div className="py-5 px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
