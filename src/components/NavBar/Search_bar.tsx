"use client";

import Link from "next/link";
import  Dropdown from "./Dropdown";
import DropdownVaga from './DropdownVaga'


export default function Bar() {
    return (
        <nav className="bg-transparent fixed w-full z-50 py-4 px-8 flex justify-end items-center">
        <div className="flex space-x-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg">
            <Link href="/admdashboard" className="text-white hover:text-yellow-300 transition-colors">Home</Link>
            <Link href="/candidatoCadastro" className="text-white hover:text-yellow-300 transition-colors">Candidato</Link>
            <DropdownVaga />
            <Link href="/empresaCadastro" className="text-white hover:text-yellow-300 transition-colors">Empresas</Link>
            <Dropdown />
        </div>
    </nav>


    );
}
