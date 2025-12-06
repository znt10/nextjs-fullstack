import { useEffect, useState } from "react";
import { listarEmpresas } from "@/app/actions";



export default function ListaEmpresa() {
    const [loading, setLoading] = useState(true);
    const [empresaCount, setEmpresaCount] = useState(0);
    useEffect(() => { 
        listarEmpresas()
            .then((data) => {
                setEmpresaCount(data.length);   // ✅ contar aqui
            })
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
            Carregando empresas...
        </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-black">Empresas</h3>
        <p className="text-3xl font-bold text-black mt-2">{empresaCount}</p>
        </div>
    );
}
