
import Image from "next/image";
import Rodape from "@/components/Rodape";
import Bar from "@/components/NavBar/Search_bar";




export default function Home () {
    
    return (
        <div className="bg-white flex flex-col min-h-screen">
            <Bar/>
        
        {/* Hero Section */}
        <section className="relative w-full h-[545px] flex items-center justify-center text-white pt-20">
        {/* Imagem de fundo */}
        <Image
            src="https://i.imgur.com/l4K7Wzm.jpeg"
            alt="JobConnect Banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            />




        {/* Conteúdo centralizado */}
        <div className="relative z-10 text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
            JobConnect é uma plataforma que conecta candidatos e empresas,
            facilitando o processo de recrutamento.
            </h1>
            <p className="text-xl">
            Cadastre vagas, empresas e currículos de forma rápida e organizada.
            </p>
        </div>

        </section>

        

        {/* Section - Opções */}
        <section className="text-center py-16 px-4">
            <h2 className="text-4xl font-bold mb-8">Sua primeira vez no site?</h2>
            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {/* Card 1 */}
            <div className="bg-gray-300 border border-white shadow-md rounded-2xl p-6 w-full max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Candidato</h3>
                <p className="text-gray-600 text-lg">
                Cadastre seu perfil profissional, envie seu currículo e encontre
                vagas que combinam com você.
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-300 border border-white shadow-md rounded-2xl p-6 w-full max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Empresa</h3>
                <p className="text-gray-600 text-lg">
                Publique oportunidades de trabalho e encontre candidatos
                qualificados para sua equipe.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-300 border border-white shadow-md rounded-2xl p-6 w-full max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Seguro e Rápido</h3>
                <p className="text-gray-600 text-lg">
                Acesse de forma segura com autenticação JWT e dados protegidos.
                </p>
            </div>
            </div>
        </section>
        <Rodape/>
        </div>
    );
};

