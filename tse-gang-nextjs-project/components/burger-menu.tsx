import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren } from "react";

export function BurgerMenu({ children }: PropsWithChildren<{}>) {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <i className="fa-solid fa-burger fa-xl text-white"></i>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
