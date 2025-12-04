import mongoose, { Schema, Document, models } from "mongoose";

export interface IEmpresa extends Document {
    nome: string;
    descricao: string;
    area_atuacao: string;
    }

    const EmpresaSchema = new Schema<IEmpresa>({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    area_atuacao: { type: String, required: true },
    });

    export default models.Empresa || mongoose.model("Empresa", EmpresaSchema);
