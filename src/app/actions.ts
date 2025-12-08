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
import { redirect } from "next/navigation";
import crypto from "crypto";



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

// ... seus imports

export async function criarVaga(formData: FormData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  // VERIFICAÇÃO DE SEGURANÇA
  if (!session || !session.user) {
      throw new Error("Usuário não autenticado");
  }

  const id = session.user.id;
  
  // 1. O CORREÇÃO AQUI: Use o operador || para ter um valor padrão
  // Se session.user.name for null, usa "Empresa Confidencial"
  const nomeEmpresa = session.user.name || "Empresa Confidencial";

  const titulo = formData.get("titulo")?.toString();
  const descricao = formData.get("descricao")?.toString();
  const requisitos = formData.get("requisitos")?.toString();
  // Converta o salário para Number, já que no seu Model é Number
  const salario = Number(formData.get("salario")); 

  if (!titulo || !descricao) {
    throw new Error("Título e descrição são obrigatórios.");
  }

  // 2. Agora salvamos com segurança
  await Vaga.create({ 
      titulo, 
      descricao, 
      requisitos, 
      salario, 
      empresaId: id, 
      empresa_nome: nomeEmpresa 
  });
  
  revalidatePath("/vervagas");
}

export async function deletarVaga(id: string) {
    try {
        await dbConnect();
        await Vaga.findByIdAndDelete(id);
        revalidatePath("/vervagas"); // Atualiza a lista na hora
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao deletar");
    }
}

export async function buscarVaga(id: string) {
  await dbConnect();
  const vaga = await Vaga.findById(id).lean();
  return JSON.parse(JSON.stringify(vaga)); // remove ObjectId
}

export async function atualizarVaga(id: string, data: any) {
  await dbConnect();
  await Vaga.findByIdAndUpdate(id, data);
  revalidatePath("/vervagas");
  return { success: true };
}  


export async function redifinirSenha(token: string, formData: FormData) {
  const novaSenha = formData.get("newPassword") as string;
  const confirmarSenha = formData.get("confirmPassword") as string;

  if (!novaSenha || !confirmarSenha) {
    return { error: "Por favor, preencha todos os campos." };
  }

  await dbConnect();


  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  }).select("+password + resetPasswordToken + resetPasswordExpires");

  if (!user) {
    redirect("/login?error=token-expirado");
  }

  const hashedPassword = await bcrypt.hash(novaSenha, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  
  redirect('/login?message=senha-resetada');
}

export async function solicitarRecuperacao(formData: FormData) {
  const email = formData.get("email") as string;
  await dbConnect();

  const user = await User.findOne({ email });
  
  if (!user) {
    return { success: true, message: "Se o usuário existir, o link foi gerado (veja no console)." };
  }

  // 1. Gera o token e data de expiração
  const token = crypto.randomBytes(20).toString("hex");
  const now = new Date();
  now.setHours(now.getHours() + 1); // Expira em 1 hora


  user.resetPasswordToken = token;
  user.resetPasswordExpires = now;
  await user.save();

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  

  const link = `${baseUrl}/reset-password/${token}`;
  

  console.log("========================================");
  console.log("🔐 LINK DE RECUPERAÇÃO GERADO:");
  console.log(link);
  console.log("========================================");

  return { success: true, message: "Link gerado! Verifique o terminal do VS Code." };
}