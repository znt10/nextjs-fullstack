// app/reset-password/[token]/page.tsx
'use client'

import { redifinirSenha } from '@/app/actions'; // Importe sua Server Action
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const { token } = params;
    const [status, setStatus] = useState<{ error?: string, success?: string }>({});

    // 1. Cria a ação com bind para incluir o token da URL
    const actionWithToken = redifinirSenha.bind(null, token);

    // 2. Função para lidar com o envio do formulário e capturar erros
    async function handleAction(formData: FormData) {
        setStatus({}); // Limpa status anterior
        const result = await actionWithToken(formData); // Chama a Server Action
        
        if (result?.error) {
            setStatus({ error: result.error });
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Definir Nova Senha</h2>
                
                {status.error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{status.error}</AlertDescription>
                    </Alert>
                )}
                
                {/* 3. Liga o formulário diretamente à Server Action */}
                <form action={handleAction} className="space-y-4">
                    <Input 
                        name="newPassword" 
                        type="password" 
                        placeholder="Nova Senha" 
                        required 
                    />
                    <Input 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Confirme a Nova Senha" 
                        required 
                    />
                    <Button type="submit" className="w-full">
                        Redefinir Senha
                    </Button>
                </form>
            </div>
        </div>
    );
}