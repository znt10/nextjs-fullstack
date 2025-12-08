'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { solicitarRecuperacao } from "@/app/actions"; // Importe a ação que criamos

export default function ForgotPasswordPage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(""); 

        try {
        // Chama a Server Action
        const res = await solicitarRecuperacao(formData);
        
        // Exibe a mensagem de sucesso (mesmo que o email não exista, por segurança)
        setMessage(res.message || "Se o e-mail estiver cadastrado, enviamos um link.");
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        
        {/* --- BACKGROUND (Mesmo do Login) --- */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1453856908920-432d43232128?q=80&w=2067&auto=format&fit=crop')",
            }}
        >
            <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Luz Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-200/40 via-blue-900/0 to-transparent z-10 pointer-events-none" />

        {/* --- CARD DE VIDRO --- */}
        <div className="z-20 w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative">
            
            {/* Brilho no topo do card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/30 blur-sm rounded-full" />

            <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Recuperar Senha
            </h1>
            <p className="text-gray-200 text-sm">
                Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.
            </p>
            </div>

            {/* Mensagem de Sucesso */}
            {message && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center gap-3 text-green-100 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">{message}</span>
            </div>
            )}

            <form action={handleSubmit} className="space-y-6">
            
            {/* Input de Email */}
            <div className="relative group">
                <Input 
                name="email" 
                type="email" 
                placeholder="Digite seu e-mail" 
                required 
                className="h-12 pl-6 pr-10 rounded-full bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus-visible:ring-offset-0 focus-visible:ring-white/50 focus-visible:border-white transition-all hover:bg-white/10"
                />
                <Mail className="absolute right-4 top-3.5 h-5 w-5 text-white/80" />
            </div>

            {/* Botão de Enviar */}
            <Button 
                disabled={loading} 
                className="w-full h-12 rounded-full bg-white text-slate-900 hover:bg-gray-100 font-bold text-lg shadow-lg transition-transform hover:scale-[1.02]"
            >
                {loading ? "Enviando..." : "Enviar Link"}
            </Button>
            </form>

            {/* Link Voltar */}
            <div className="mt-8 text-center">
            <Link 
                href="/login" 
                className="text-white/80 hover:text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para o Login
            </Link>
            </div>
        </div>
        </div>
    );
}