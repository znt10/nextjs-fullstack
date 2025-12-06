"use client";

import { useEffect, useState } from "react";
import { listarEmpresas } from "@/app/actions";

export default function ListaEClient() {
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listarEmpresas()
        .then(setEmpresas)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando empresas...</p>;

    return (
        <section className="mt-10 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Lista de Empresas</h1>
        {empresas.length === 0 ? (
            <div className="text-center text-gray-600 text-lg py-10 bg-gray-100 rounded-lg shadow-sm">
            Nenhuma empresa encontrada.
            </div>
        ) : (
            <div className="grid gap-8 grid-cols-1">
            {empresas.map((e) => (
                <article
                key={e._id}
                className="p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                <h2 className="text-2xl font-semibold text-gray-900">{e.nome}</h2>
                <p className="text-gray-500 mt-1">{e.descricao}</p>
                <p className="text-gray-700 mt-2 text-sm">
                    <strong>Área de atuação:</strong> {e.area_atuacao}
                </p>
                </article>
            ))}
            </div>
        )}
        </section>
    );
}
