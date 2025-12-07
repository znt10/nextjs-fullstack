"use client";



import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";







function DropdownMenuCustom() {
    const navigate = useRouter();
    
    
    const handleLogout = async () => {
        navigate.push("/");
    };
    
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <div className="text-white hover:text-yellow-300 transition-colors">Login</div>
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Ações do usuário"
                className="bg-white/95 backdrop-blur-md border border-[#463baf]/20 shadow-lg rounded-xl"
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-sm",
                        "font-medium",
                        "data-[hover=true]:bg-[#463baf]/10",
                        "data-[selectable=true]:focus:bg-[#463baf]/20",
                        "data-[pressed=true]:bg-[#463baf]/20",
                        "text-gray-700",
                        "data-[color=danger]:text-red-600",
                    ],
                }}
            >
                <DropdownItem key="perfil" onClick={() => navigate.push("/login")}>Entrar</DropdownItem>

                
                <DropdownItem key="logout" color="danger" className="text-red-600 font-semibold"  onClick={() => signOut({ callbackUrl: "/" })} >
                    Sair
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default DropdownMenuCustom;
