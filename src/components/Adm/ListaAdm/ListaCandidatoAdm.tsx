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
            <div key={c._id} className="p-4 border rounded-lg">
                <h2 className="font-semibold">{c.nome}</h2>
                <p>{c.curriculo}</p>
            </div>
            ))}
        </div>
        </section>
    );
}
