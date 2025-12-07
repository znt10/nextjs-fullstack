import { TrashIcon } from "@heroicons/react/24/outline";
import {deletarVaga } from "@/app/actions";



interface BtnDeletarProps {
    vagaId: string;
}

function BtnDeletar({ vagaId }: BtnDeletarProps) {

    const handleDelete = async () => {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta vaga?");
        if (!confirmar) return;

        try {
            async function executeDelete() {
                await deletarVaga(vagaId);
            }

        } catch (error) {
            console.error("Erro ao deletar vaga:", error);
            alert("Erro ao tentar excluir a vaga. Tente novamente.");
        }

    };

    return (
        <button
        onClick={handleDelete}
        className="absolute top-2 right-10 p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
        title="Excluir vaga"
        >
        <TrashIcon className="h-5 w-5" />
        </button>
    );
}

export default BtnDeletar;
