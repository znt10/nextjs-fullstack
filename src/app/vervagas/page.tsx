"use client";

import { useEffect, useState } from "react";
import Bar from "@/components/NavBar/Search_bar";
import { listarvagas } from "@/app/actions";  

export default function VerVagas() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const load = async () => {
        try {
            const dados = await listarvagas();
            setVagas(dados);
        } catch (error) {
            console.error("Erro ao carregar vagas:", error);
            setVagas([]);
        } finally {
            setLoading(false);
        }
        };

        load();
    }, []);

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
            Carregando vagas...
        </div>
        );
    }

    return (
        <>
        <div className="fixed top-0 left-0">
            <Bar />
        </div>

        <section className="mt-28 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Vagas Disponíveis
            </h1>

            {vagas.length === 0 ? (
            <div className="text-center text-gray-600 text-lg py-10 bg-gray-100 rounded-lg shadow-sm">
                Nenhuma vaga disponível no momento.
            </div>
            ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {vagas.map((vaga: any, index) => (
                <article
                    key={vaga.id ?? index}
                    className="relative p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                    <h2 className="text-2xl font-semibold text-gray-900">
                    {vaga.titulo}
                    </h2>

                    <p className="text-sm text-gray-500">
                    {vaga.empresa_nome || "Empresa confidencial"}
                    </p>

                    <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {vaga.descricao}
                    </p>

                </article>
                ))}
            </div>
            )}
        </section>
        </>
    );
}
