"use client";

import { useState } from "react";
import { BarChart3, Users, Briefcase, Settings, LogOut } from "lucide-react";
import Rodape from "@/components/Rodape";
import Link from "next/link";

import ListaC from "@/components/Adm/ListaAdm/ListaCandidatoAdm";
import ListaE from "@/components/Adm/ListaAdm/ListaEmpresaAdm";
import CardCandidato from "@/components/Adm/CardAdm/CardCandidato";
import CardEmpresa from "@/components/Adm/CardAdm/CardEmpresa";
import CardVagas from "@/components/Adm/CardAdm/CardVagas";

export default function AdminDashboard() {
    const [selectedSection, setSelectedSection] = useState("overview");

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Topbar */}
        <header className="bg-gray-600 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <Link href="/">
            <button className="flex items-center gap-2 hover:text-gray-200">
                <LogOut className="w-5 h-5" />
                Sair
            </button>
            </Link>
        </header>

        <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="bg-white w-64 border-r shadow-sm p-6 flex flex-col gap-4">
            <button
                onClick={() => setSelectedSection("overview")}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 ${
                selectedSection === "overview" ? "bg-blue-100 font-semibold" : ""
                }`}
            >
                <BarChart3 className="w-5 h-5 text-gray-500" />
                Visão Geral
            </button>

            <button
                onClick={() => setSelectedSection("empresas")}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 ${
                selectedSection === "empresas" ? "bg-blue-100 font-semibold" : ""
                }`}
            >
                <Briefcase className="w-5 h-5 text-gray-500" />
                Empresas
            </button>

            <button
                onClick={() => setSelectedSection("candidatos")}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 ${
                selectedSection === "candidatos" ? "bg-blue-100 font-semibold" : ""
                }`}
            >
                <Users className="w-5 h-5 text-gray-500" />
                Candidatos
            </button>

            <button
                onClick={() => setSelectedSection("config")}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 ${
                selectedSection === "config" ? "bg-blue-100 font-semibold" : ""
                }`}
            >
                <Settings className="w-5 h-5 text-gray-500" />
                Configurações
            </button>
            </aside>

            {/* Conteúdo principal */}
            <main className="flex-1 p-8">
            {selectedSection === "overview" && (
                <div>
                <h2 className="text-3xl font-bold mb-6">Visão Geral</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <CardCandidato/>
                    <CardEmpresa/>
                    <CardVagas/>
                
                </div>
                </div>
            )}
    
            {selectedSection === "empresas" && <ListaE />}

            {selectedSection === "candidatos" && <ListaC />}

            {selectedSection === "config" && (
                <div>
                <h2 className="text-3xl font-bold mb-6">Configurações do Sistema</h2>
                <p className="text-gray-600">Opções de personalização e controle administrativo.</p>
                </div>
            )}
            </main>
        </div>

        <Rodape />
        </div>
    );
}
