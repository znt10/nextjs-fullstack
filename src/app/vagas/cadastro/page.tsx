import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { redirect } from "next/navigation";
import VagasCadastro from "@/components/vagas/vagascadastro"; 
import AcessoNegado from "@/components/AcessoNegado";

export default async function CadastroVagaPage() {
    // 1. Pega sessão no servidor
    const session = await getServerSession(authOptions);

    // 2. Valida se logado
    if (!session) {
        redirect("/login");
    }

    // 3. Valida se é empresa (Proteção de Rota)
    if (session.user.role !== "empresa") {
        // Se for candidato tentando acessar, joga pra home ou outra pág
        return <AcessoNegado />;
    }

    // 4. Se passou, renderiza o componente cliente (o form)
    return <VagasCadastro />;
}