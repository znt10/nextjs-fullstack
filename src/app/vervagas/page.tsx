import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
// import { redirect } from "next/navigation"; // Não precisa se não for bloquear acesso
import VerVagas from "@/components/vagas/vervagas";

export default async function PageVerVagas() {
    const session = await getServerSession(authOptions);
    
    // CORREÇÃO AQUI:
    // 1. O operador ?. (interrogação) evita o erro se session for null.
    // 2. O operador || (ou) define "Candidato" como valor padrão caso não haja login ou role.
    const userRole = session?.user?.role || "Candidato";
    const userId = session?.user?.id || null;
    
    return <VerVagas tipo={userRole} userId={userId} />;
}