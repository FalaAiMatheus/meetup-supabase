import { supabase } from "@/services/supabase";
import { RequestBody } from "@/services/types";
import { hash } from "bcryptjs";

const SALT_ROUNDS = 10;

export class MeetupUserRepository {
  async createUser({ body }: RequestBody) {
    const hashedPassword = await hash(body.senha, SALT_ROUNDS);
    const { error } = await supabase.from("usuarios").insert({
      ...body,
      senha: hashedPassword,
    });
    if (error) throw new Error(String(error));
    return;
  }
  async getUsers() {
    const { data, error } = await supabase.from("usuarios").select("*");
    if (error) throw new Error(String(error));
    return { data: data };
  }
  async deleteUser(id: number) {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) throw new Error(String(error));
    return alert("Usuário deletado com sucesso");
  }
}
