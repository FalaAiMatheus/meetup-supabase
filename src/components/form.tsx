"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MeetupUserRepository } from "@/repository/repository";
import { UserFormData, userSchema } from "@/services/schema";
import { useState } from "react";
import { z } from "zod";

export const FormComponent = () => {
  const { createUser } = new MeetupUserRepository();
  const [formData, setFormData] = useState<UserFormData>({
    nome: "",
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      userSchema.parse(formData);
      await createUser({ body: { ...formData } });
      setFormData({
        nome: "",
        email: "",
        senha: "",
      });
      window.location.reload(); // Atualiza a página após a criação do usuário
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(formattedErrors);
      } else {
        console.error("Erro ao criar usuário:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
        {errors.nome && <p className="text-red-500">{errors.nome}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="senha">Senha:</Label>
        <Input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
        />
        {errors.senha && <p className="text-red-500">{errors.senha}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
      {loading && <p className="text-blue-500">Carregando...</p>}
    </form>
  );
};
