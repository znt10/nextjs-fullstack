import dbConnect from "@/lib/db";
import Vaga from "@/models/Vaga";

export async function DELETE(_: Request, { params }: any) {
    await dbConnect();
    await Vaga.findByIdAndDelete(params.id);
    return Response.json({ message: "Vaga removida" });
}


export async function PATCH(request: Request, { params }: any) {
    await dbConnect();
    const body = await request.json();
    const vagaAtualizada = await Vaga.findByIdAndUpdate(params.id, body, { new: true });
    return Response.json(vagaAtualizada);
}
