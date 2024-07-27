import { z } from "zod";

export const userSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é requirida"),
});

export type UserFormData = z.infer<typeof userSchema>;
