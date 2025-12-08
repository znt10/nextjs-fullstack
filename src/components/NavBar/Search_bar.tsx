"use client";

import Link from "next/link";
import Dropdown from "./Dropdown";
import DropdownVaga from "./DropdownVaga";

export default function Bar() {
  return (
    <nav className="bg-transparent fixed w-full z-50 py-4 px-8 flex justify-end items-center">
      <div className="flex items-center gap-6 bg-gray-800/60 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10">

        <Link
          href="/"
          className="text-white px-2 py-1 hover:text-yellow-300 transition-colors"
        >
          Home
        </Link>

        <Link
          href="/candidatoCadastro"
          className="text-white px-2 py-1 hover:text-yellow-300 transition-colors"
        >
          Candidato
        </Link>

        <div className="px-2 py-1">
          <DropdownVaga />
        </div>

        <Link
          href="/empresaCadastro"
          className="text-white px-2 py-1 hover:text-yellow-300 transition-colors"
        >
          Empresas
        </Link>

        <div className="px-2 py-1">
          <Dropdown />
        </div>

      </div>
    </nav>
  );
}
