"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { buscarVaga, atualizarVaga } from "@/app/actions";
import Image from "next/image";

// Em Next.js App Router, páginas dinâmicas recebem 'params' como prop
export default function VagasEditar({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    
    // Desembrulha a Promise do params (Compatível com Next.js 15)
    // Se der erro aqui, tente: const { id } = use(params);
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [titulo, setTitulo] = useState("");
    const [requisitos, setRequisitos] = useState("");
    const [descricao, setDescricao] = useState("");
    const [salario, setSalario] = useState("");

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // Carregar dados da vaga
    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            
            try {
                const vaga = await buscarVaga(id);
                if (vaga) {
                    setTitulo(vaga.titulo || "");
                    setRequisitos(vaga.requisitos || "");
                    setDescricao(vaga.descricao || "");
                    setSalario(vaga.salario ? String(vaga.salario) : "");
                } else {
                    setErrorMessage("Vaga não encontrada.");
                }
            } catch (error) {
                console.error(error);
                setErrorMessage("Erro ao buscar dados.");
            } finally {
                // O finally garante que o loading para, mesmo se der erro
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        // Criamos um objeto com os dados para enviar para a Server Action
        const data = {
            titulo,
            requisitos,
            descricao,
            salario,
        };

        try {
            await atualizarVaga(id, data);
            alert("Vaga atualizada com sucesso!");
            router.push("/vervagas");
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao atualizar a vaga. Tente novamente.");
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex flex-col gap-2 items-center justify-center text-gray-600">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                <p>Carregando dados...</p>
            </div>
        );
    }

    return (
        <section id="section-edit-page" className="bg-white font-poppins">
            <div className="min-h-screen flex items-stretch">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                    {/* Formulário */}
                    <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                        <div className="w-full max-w-md">
                            {errorMessage && (
                                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                                    {errorMessage}
                                </div>
                            )}
                    
                            <div className="mb-10">
                                <h1 className="text-black text-[32px] font-medium ">
                                    Editar vaga
                                </h1>
                                <p className="text-black text-sm font-medium leading-[21px] mt-2">
                                    Atualize as informações da vaga publicada
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="job-title" className="block text-black text-sm font-medium mb-2">
                                        Vaga disponível
                                    </label>
                                    <input
                                        type="text"
                                        id="job-title"
                                        onChange={(e) => setTitulo(e.target.value)}
                                        value={titulo}
                                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="requirements" className="block text-black text-sm font-medium mb-2">
                                        Requisitos
                                    </label>
                                    <input
                                        type="text"
                                        id="requirements"
                                        onChange={(e) => setRequisitos(e.target.value)}
                                        value={requisitos}
                                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-black text-sm font-medium mb-2">
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        value={descricao}
                                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="salary" className="block text-black text-sm font-medium mb-2">
                                        Salário
                                    </label>
                                    <input
                                        type="text"
                                        id="salary"
                                        onChange={(e) => setSalario(e.target.value)}
                                        value={salario}
                                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                                    />
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-600 text-white font-bold text-[13px] py-3 rounded-[10px] hover:bg-gray-800 transition-colors"
                                    >
                                        Atualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Imagem */}
                    <div className="relative hidden lg:block">
                        <Image
                            src="https://i.imgur.com/0HlkYWv.jpeg"
                            alt="Imagem"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}