"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";

function DropdownMenuCustom() {
  const navigate = useRouter();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="text-white px-2 py-1 hover:text-yellow-300 transition-colors flex items-center gap-2">
          Vagas
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Menu Vagas"
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
        <DropdownItem key="cadastrar-vagas" onClick={() => navigate.push("/vagas/cadastro")}>
          Cadastrar Vagas
        </DropdownItem>

        <DropdownItem key="ver-vagas-empresa" onClick={() => navigate.push("/vervagas")}>
          Ver Vagas
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownMenuCustom;
