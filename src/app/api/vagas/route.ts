import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vaga from "@/models/Vaga";

export async function GET() {
    try {
        await dbConnect();
        const vagas = await Vaga.find().populate("empresaId");
        return NextResponse.json(vagas);
    } catch (error) {
        console.error("ERRO GET /api/vagas:", error);
        return NextResponse.json({ error: "Erro ao carregar vagas" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    await dbConnect();
    const body = await request.json();
    const novaVaga = await Vaga.create(body);
    return Response.json(novaVaga, { status: 201 });
}
