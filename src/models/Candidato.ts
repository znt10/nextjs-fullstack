import mongoose, { Schema, Document, models } from "mongoose";

export interface ICandidato extends Document {
    nome: string;
    curriculo: string;
    }

    const CandidatoSchema = new Schema<ICandidato>(
    {
        nome: { type: String, required: true },
        curriculo: { type: String, required: true },
    },
    { timestamps: true }
    );

    export default models.Candidato ||
    mongoose.model<ICandidato>("Candidato", CandidatoSchema);
