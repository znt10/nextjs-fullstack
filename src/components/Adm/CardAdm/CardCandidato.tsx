"use client";
import { useEffect, useState } from "react";
import { listarCandidatos } from "@/app/actions";

export default function ListaCandidato() {
    const [loading, setLoading] = useState(true);
    const [candidatoCount, setCandidatoCount] = useState(0);

    useEffect(() => {
        listarCandidatos()
            .then((data) => {
                setCandidatoCount(data.length);   // ✅ contar aqui
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
                Carregando vagas...
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-black">Candidatos</h3>

            {/* Mostrar a contagem */}
            <p className="text-3xl font-bold text-black mt-2">
                {candidatoCount}
            </p>
        </div>
    );
}
