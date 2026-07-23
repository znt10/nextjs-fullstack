import dbConnect from "@/lib/db";
import Vaga from "@/models/Vaga";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    await Vaga.findByIdAndDelete(id);
    return Response.json({ message: "Vaga removida" });
}


export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const vagaAtualizada = await Vaga.findByIdAndUpdate(id, body, { new: true });
    return Response.json(vagaAtualizada);
}
