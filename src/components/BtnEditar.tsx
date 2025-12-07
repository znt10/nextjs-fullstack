"use client";

import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/24/outline";



interface BtnEditarProps {
    vagaId: string;
}


function BtnEditar({ vagaId }: BtnEditarProps) {
    const navigate = useRouter();

    const handleEdit = () => {
        navigate.push(`/editar/${vagaId}`);
    };
    
    return (
        <button 
            onClick={handleEdit}
            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Editar vaga"
        >
            <PencilIcon className="h-5 w-5" />
        </button>
    );
}

export default BtnEditar;