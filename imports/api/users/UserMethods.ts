import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

class UserCreator {
  static createUser(email: string, password: string) {
    Accounts.createUser({
      email,
      password,
    });
  }
}

class UserService {
  static signup(userData: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const parsedData = signupSchema.parse(userData);
    UserCreator.createUser(parsedData.email, parsedData.password);
  }
}

Meteor.methods({
  "user.signup"(userData: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      UserService.signup(userData);
    } catch (error) {
      throw new Meteor.Error("signup-failed", error.message);
    }
  },
});
