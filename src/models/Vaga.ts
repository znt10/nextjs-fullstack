import mongoose, { Schema, Document, models } from "mongoose";

export interface IVaga extends Document {
    titulo: string;
    descricao: string;
    requisitos: string;
    salario: number;
    empresaId: mongoose.Types.ObjectId;
    }

    const VagaSchema = new Schema<IVaga>(
    {
        titulo: { type: String, required: true },
        descricao: { type: String, required: true },
        requisitos: { type: String, required: true },
        salario: { type: Number, required: true },
        empresaId: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
    },
    { timestamps: true }
    );

    export default models.Vaga ||
    mongoose.model<IVaga>("Vaga", VagaSchema);
