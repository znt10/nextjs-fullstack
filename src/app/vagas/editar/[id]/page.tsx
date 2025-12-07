"use client";


import { useRouter } from "next/navigation";
import Image from "next/image";


export default function VagasEditar() {

    const [loading, setLoading] = useState(true);

    const navigate = useRouter();



    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen text-gray-600">
            Carregando dados da vaga...
        </div>
        );
    }

    return (
        <section id="section-edit-page" className="bg-white font-poppins">
        <div className="min-h-screen flex items-stretch">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            {/* Formulário */}
            <div className="flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md">
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
                    <label
                        htmlFor="job-title"
                        className="block text-black text-sm font-medium mb-2"
                    >
                        Vaga disponível
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setTitulo(e.target.value)}
                        value={titulo}
                        id="job-title"
                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                    />
                    </div>

                    <div>
                    <label
                        htmlFor="requirements"
                        className="block text-black text-sm font-medium mb-2"
                    >
                        Requisitos
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setRequisitos(e.target.value)}
                        value={requisitos}
                        id="requirements"
                        className="w-full border rounded-[10px] p-2.5 text-sm focus:ring-2 focus:ring-gray-400 outline-none transition"
                    />
                    </div>

                    <div>
                    <label
                        htmlFor="description"
                        className="block text-black text-sm font-medium mb-2"
                    >
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
                    <label
                        htmlFor="salary"
                        className="block text-black text-sm font-medium mb-2"
                    >
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
            <div className="hidden lg:block">
                <Image
                src="https://i.imgur.com/ryabWME.jpeg"
                width={1200}
                height={800}
                alt="Foto lateral"
                fill
                className="object-cover rounded-l-[45px]"
                />
            </div>
            </div>
        </div>
        </section>
    );
}
