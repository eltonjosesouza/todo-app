import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { z } from "zod";

// Esquema Zod para validação no servidor
const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

Meteor.methods({
  "user.signup"(userData) {
    // Validação dos dados recebidos
    const parsedData = signupSchema.parse(userData);

    // Criação do usuário
    Accounts.createUser({
      email: parsedData.email,
      password: parsedData.password,
    });
  },
});
