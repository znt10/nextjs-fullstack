'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User, Lock } from "lucide-react";
 // Certifique-se de ter este componente ou use input type="checkbox"

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou senha inválidos");
    } else {
      router.push("/");
    }
  }

  return (
    // Container Principal com Background
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      
      {/* 1. Imagem de Fundo (Parede de Tijolos) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1453856908920-432d43232128?q=80&w=2067&auto=format&fit=crop')", // Exemplo de parede de tijolos
        }}
      >
        {/* Camada Azul Escura por cima da imagem */}
        <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Efeito de Luz (Lâmpada no topo) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-200/40 via-blue-900/0 to-transparent z-10 pointer-events-none" />
      
      {/* 3. Card de Vidro (Glassmorphism) */}
      <div className="z-20 w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative">
        
        {/* Iluminação interna sutil no topo do card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/30 blur-sm rounded-full" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-md">
            Login
          </h1>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-500/20 border-red-500/50 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Usuário/Email */}
          <div className="relative group">
            <Input 
              name="email" 
              type="email" 
              placeholder="Username" 
              required 
              className="h-12 pl-6 pr-10 rounded-full bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus-visible:ring-offset-0 focus-visible:ring-white/50 focus-visible:border-white transition-all hover:bg-white/10"
            />
            <User className="absolute right-4 top-3.5 h-5 w-5 text-white/80" />
          </div>
          
          {/* Input Senha */}
          <div className="relative group">
            <Input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              className="h-12 pl-6 pr-10 rounded-full bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus-visible:ring-offset-0 focus-visible:ring-white/50 focus-visible:border-white transition-all hover:bg-white/10"
            />
            <Lock className="absolute right-4 top-3.5 h-5 w-5 text-white/80" />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm text-white/90 px-2">
            <div className="flex items-center space-x-2">
                <input 
                    type="checkbox" 
                    id="remember" 
                    className="w-4 h-4 rounded border-white/40 bg-white/10 text-white focus:ring-offset-0 focus:ring-0 cursor-pointer"
                />
              <label htmlFor="remember" className="cursor-pointer font-medium hover:text-white transition-colors">
                Remember me
              </label>
            </div>
            <Link href="#" className="font-medium hover:text-white transition-colors hover:underline">
              Forgot password?
            </Link>
          </div>
          
          {/* Botão de Login */}
          <Button className="w-full h-12 rounded-full bg-white text-slate-900 hover:bg-gray-100 font-bold text-lg shadow-lg transition-transform hover:scale-[1.02]">
            Login
          </Button>
        </form>
        
      </div>
    </div>
  );
}