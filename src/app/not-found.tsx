import Link from "next/link";


export default function NotFound() {
  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center font-poppins">

      {/* Ícone ou Elemento Visual */}
      <div className="bg-gray-200 p-4 rounded-full mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-16 h-16 text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">404</h1>
      
      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        Ops! Página não encontrada.
      </h2>
      
      <p className="text-gray-600 mt-2 max-w-md mx-auto">
        A página que você procurou sumiu, <br className="hidden sm:block" />
        <span className="text-gray-800 font-semibold">mas o seu próximo emprego pode estar aqui.</span>
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* Botão Principal: Ver Vagas */}
        <Link
          href="/vervagas"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all hover:-translate-y-1"
        >
          Encontrar Vagas
        </Link>

        {/* Botão Secundário: Voltar ao Início */}
        <Link
          href="/"
          className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}