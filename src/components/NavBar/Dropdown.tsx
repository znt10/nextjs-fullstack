"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function DropdownMenuCustom() {
  const navigate = useRouter();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="text-white px-2 py-1 hover:text-yellow-300 transition-colors flex items-center gap-2 cursor-pointer">
          Login
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Menu do usuário"
        className="bg-white/90 backdrop-blur-lg border border-gray-300 shadow-xl rounded-xl py-2"
        itemClasses={{
          base: [
            "rounded-lg",
            "text-sm",
            "font-medium",
            "px-3",
            "py-2",
            "transition-colors",
            "text-gray-700",
            "data-[hover=true]:bg-gray-100",
            "data-[selectable=true]:focus:bg-gray-200",
            "data-[pressed=true]:bg-gray-200",
          ],
        }}
      >
        <DropdownItem key="login" onClick={() => navigate.push("/login")}>
          Entrar
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          className="text-red-600 font-semibold data-[hover=true]:bg-red-100"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownMenuCustom;
