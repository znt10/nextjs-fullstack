// /app/api/empresa/route.ts
import { NextResponse } from "next/server";
import Empresa from "@/models/Empresa";
import connectDB from "@/lib/db";

// Conectar banco ANTES de qualquer operação
connectDB();

// ============================
// POST → Criar Empresa
// ============================
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nome, descricao, area_atuacao } = body;

        if (!nome || !descricao || !area_atuacao) {
        return NextResponse.json(
            { error: "Todos os campos são obrigatórios!" },
            { status: 400 }
        );
        }

        const novaEmpresa = await Empresa.create({
        nome,
        descricao,
        area_atuacao,
        });

        return NextResponse.json(novaEmpresa, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
        { error: error.message || "Erro ao criar empresa" },
        { status: 500 }
        );
    }
}

// ============================
// GET → Listar todas as empresas
// ============================
export async function GET() {
    try {
        const empresas = await Empresa.find().sort({ createdAt: -1 });
        return NextResponse.json(empresas);
    } catch (error: any) {
        return NextResponse.json(
        { error: "Erro ao buscar empresas"},
        { status: 500 }
        );
    }
}
