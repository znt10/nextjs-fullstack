"use client"; // <--- Essencial para usar onClick

import { TrashIcon } from "@heroicons/react/24/outline";
import { deletarVaga } from "@/app/actions";

interface BtnDeletarProps {
    vagaId: string;
}

function BtnDeletar({ vagaId }: BtnDeletarProps) {

    const handleDelete = async () => {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta vaga?");
        if (!confirmar) return;

        try {
            // CORREÇÃO: Chame a Server Action diretamente aqui.
            // Não precisa criar uma function dentro de outra function.
            await deletarVaga(vagaId);
            
            alert("Vaga excluída com sucesso!"); 
            window.location.reload();

        } catch (error) {
            console.error("Erro ao deletar vaga:", error);
            alert("Erro ao tentar excluir a vaga. Tente novamente.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="absolute top-2 right-12 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
            title="Excluir vaga"
            type="button" // Boa prática para evitar submits acidentais se estiver dentro de um form
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    );
}

export default BtnDeletar;