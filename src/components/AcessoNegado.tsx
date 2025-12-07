// components/AcessoNegado.tsx
"use client";

import Link from "next/link";

export default function AcessoNegado() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
            Acesso Negado
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
            Você não tem permissão para acessar esta página.  
            Apenas contas do tipo <b>empresa</b> podem cadastrar vagas.
        </p>

        <Link 
            href="/"
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
            Voltar para Home
        </Link>
        </div>
    );
}
