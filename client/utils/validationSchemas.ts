import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Endereço de email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .max(16, { message: "A senha não pode ter mais de 16 caracteres" })
      .regex(/[a-z]/, {
        message: "A senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
      .regex(/[@$!%*?&]/, {
        message:
          "A senha deve conter pelo menos um caractere especial (@$!%*?&)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
