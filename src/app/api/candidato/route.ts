import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Candidato from "@/models/Candidato";

// ============================
// GET → Listar candidatos
// ============================
export async function GET() {
    try {
        await dbConnect();

        const candidatos = await Candidato.find().sort({ createdAt: -1 });

        return NextResponse.json(candidatos, { status: 200 });
    } catch (error) {
        console.error("ERRO GET /api/candidato:", error);
        return NextResponse.json(
            { error: "Erro ao carregar candidatos" },
            { status: 500 }
        );
    }
}

// ============================
// POST → Criar candidato
// ============================
export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();

        if (!body.nome || !body.curriculo) {
            return NextResponse.json(
                { error: "Nome e currículo são obrigatórios!" },
                { status: 400 }
            );
        }

        const novoCandidato = await Candidato.create(body);

        return NextResponse.json(novoCandidato, { status: 201 });
    } catch (error) {
        console.error("ERRO POST /api/candidato:", error);
        return NextResponse.json(
            { error: "Erro ao criar candidato" },
            { status: 500 }
        );
    }
}
