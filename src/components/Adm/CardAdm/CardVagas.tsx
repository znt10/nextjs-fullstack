import { useEffect, useState } from "react";
import {listarvagas} from "@/app/actions";




export default function ListaVagas(){
    const [vagascount, setVagas] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            listarvagas()
                .then((data) => {
                    setVagas(data);
                    setVagas(data.length);   // ✅ contar aqui
                })
                .finally(() => setLoading(false));
        }, []);


    

        
            if (loading) {
                return (
                <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
                    Carregando vagas...
                </div>
                );
            }



    return(

            <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-black">Vagas</h3>
            <p className="text-3xl font-bold text-black mt-2">{vagascount}</p>
            </div>

    );
}