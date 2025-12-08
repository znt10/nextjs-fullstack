"use client";

import { useEffect, useState } from "react";
import { listarvagas } from "@/app/actions";
import BtnDeletar from "@/components/BtnDeletar";
import BtnEditar from "@/components/BtnEditar"; // Supondo que você tenha esse import

interface VerVagasProps {
    tipo: string;
    userId: string | null | undefined; // Nova prop para receber o ID
}

export default function VerVagas({ tipo, userId }: VerVagasProps) {
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

    const isEmpresa = tipo === "empresa";

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
                Carregando vagas...
            </div>
        );
    }

    return (
        <>
            <section className="px-6 max-w-7xl mx-auto pb-10 pt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
                        Vagas Disponíveis
                    </h1>
                </div>

                {vagas.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg py-10 bg-gray-100 rounded-lg shadow-sm">
                        Nenhuma vaga disponível no momento.
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {vagas.map((vaga: any, index) => {
                            // Verifica se o usuário logado é o dono da vaga
                            const isDonoDaVaga = isEmpresa && userId === vaga.empresaId;

                            return (
                                <article
                                    key={vaga._id || index}
                                    className="relative p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
                                >
                                    {/* Botões de Ação (Só aparecem se for Empresa E for o Dono) */}
                                    {isDonoDaVaga && (
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <BtnEditar vagaId={vaga._id} />
                                            <BtnDeletar vagaId={vaga._id} />
                                        </div>
                                    )}

                                    {/* Restante do card... */}
                                    <div className="mb-4 pr-10">
                                        <h2 className="text-2xl font-semibold text-gray-900 break-words">
                                            {vaga.titulo}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {/* Se vaga.empresa_nome não existir, mostra o texto padrão */}
                                            {vaga.empresa_nome || "Empresa Confidencial"}
                                        </p>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                                        {vaga.descricao || "Sem descrição disponível."}
                                    </p>

                                    <div className="text-gray-600 text-sm space-y-1 mb-4">
                                        <p>
                                            <strong className="text-gray-800">Requisitos:</strong>{" "}
                                            {vaga.requisitos || "Não especificado"}
                                        </p>
                                        <br />
                                        <p>
                                            <strong className="text-gray-800">Salário:</strong>{" "}
                                            {vaga.salario ? `R$ ${vaga.salario}` : "A combinar"}
                                        </p>
                                    </div>

                                    {!isEmpresa && (
                                        <button className="w-40 bg-gray-700 text-white font-bold text-xs py-2 rounded-md hover:bg-gray-800 transition-colors">
                                            Me candidatar
                                        </button>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
}