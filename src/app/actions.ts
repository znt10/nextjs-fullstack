'use server'

import dbConnect from "@/lib/db";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Candidato from "@/models/Candidato";
import Empresa from "@/models/Empresa";
import Vaga from "@/models/Vaga";



// --- AÇÃO DE REGISTRO ---
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role)
    return { error: "Preencha todos os campos!" };

  await dbConnect();

  // Verifica se já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "Email já cadastrado" };

  // Criptografa senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // --- Criar perfil automaticamente ---
  if (role === "candidato") {
    await Candidato.create({
      nome: name,
      curriculo: formData.get("curriculo") || "",
      userId: user._id,
    });
  }

  if (role === "empresa") {
    await Empresa.create({
      nome: name,
      descricao: formData.get("descricao") || "",
      area_atuacao: formData.get("area_atuacao") || "",
      userId: user._id,
    });
  }

  return { success: true, id: user._id.toString() };
}



// --- AÇÃO DE CANDIDATOS ---
export async function listarCandidatos() {
  await dbConnect();
  const candidatos = await Candidato.find().lean();
  return JSON.parse(JSON.stringify(candidatos));
}

export async function criarCandidato(formData: FormData) {
  await dbConnect();

  const nome = formData.get("nome")?.toString();
  const curriculo = formData.get("curriculo")?.toString();
  const telefone = formData.get("telefone")?.toString();

  if (!nome || !curriculo) {
    throw new Error("Nome e currículo são obrigatórios.");
  }

  await Candidato.create({ nome, curriculo, telefone });

  revalidatePath("/candidatos");
}

export async function deletarCandidato(id: string) {
  await dbConnect();
  await Candidato.findByIdAndDelete(id);
  revalidatePath("/candidatos");
}

export async function atualizarCandidato(id: string, data: any) {
  await dbConnect();
  await Candidato.findByIdAndUpdate(id, data);
}


// --- AÇÃO DE empresa ---
export async function listarEmpresas() {
  await dbConnect();
  const empresas = await Empresa.find().lean();
  return JSON.parse(JSON.stringify(empresas));
}

export async function criarEmpresa(formData: FormData) {
  await dbConnect();

  const nome = formData.get("nome")?.toString();
  const descricao = formData.get("descricao")?.toString();
  const telefone = formData.get("telefone")?.toString();
  if (!nome || !descricao) {
    throw new Error("Nome e descrição são obrigatórios.");
  }
  await Empresa.create({ nome, descricao, telefone });

}



//--acao de vagas--//

export async function listarvagas(){
  await dbConnect();
  const vagas = await Vaga.find().lean();
  return JSON.parse(JSON.stringify(vagas));
}


export async function criarVaga(formData: FormData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const titulo = formData.get("titulo")?.toString();
  const descricao = formData.get("descricao")?.toString();
  const requisitos = formData.get("requisitos")?.toString();
  const salario = formData.get("salario")?.toString();
  

  if (!titulo || !descricao) {
    throw new Error("Título e descrição são obrigatórios.");
  }
  await Vaga.create({ titulo, descricao, requisitos,salario,empresaId: id });
  revalidatePath("/vervagas");
}


export async function deletarVaga(id: string) {
  await dbConnect();
  await Vaga.findByIdAndDelete(id);
  revalidatePath("/vervagas");
}

export async function atualizarVaga(id: string, data: any) {
  await dbConnect();
  await Vaga.findByIdAndUpdate(id, data);
  revalidatePath("/vervagas");
}