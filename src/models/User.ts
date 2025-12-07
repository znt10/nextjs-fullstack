import mongoose, { Schema, models, model, Document } from "mongoose";

// 1. Defina a Interface (Tipagem)
export interface IUser extends Document {
  email: string;
  password?: string; // Opcional pq no select: false ele pode não vir
  name: string;
  role: "candidato" | "empresa";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  
  // select: false é ÓTIMO para segurança (evita vazar senha em buscas normais)
  // Lembre-se de usar .select("+password") no NextAuth
  password: { type: String, required: true, select: false },
  
  name: { type: String, required: true },
  
  // Garante que só entra texto válido
  role: { type: String, enum: ["candidato", "empresa"], required: true },
}, { timestamps: true });

// O padrão Singleton para Next.js
const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;