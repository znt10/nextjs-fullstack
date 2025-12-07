"use client";

import { useEffect, useState } from "react";
import { listarCandidatos } from "@/app/actions";

export default function ListaCClient() {
    const [candidatos, setCandidatos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listarCandidatos()
        .then(setCandidatos)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando candidatos...</p>;

    return (
        <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Candidatos</h1>
        {candidatos.length === 0 && <p>Nenhum candidato encontrado.</p>}

        <div className="flex flex-col gap-4">
            {candidatos.map((c) => (
            <article
                key={c._id}
                className="p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                <h2 className="text-2xl font-semibold text-gray-900">{c.nome}</h2>
                <p>{c.curriculo}</p>
                </article>
            ))}
        </div>
        </section>
    );
}
