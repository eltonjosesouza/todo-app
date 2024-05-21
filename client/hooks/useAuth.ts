import { Meteor } from "meteor/meteor";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { Accounts } from "meteor/accounts-base";
import { useCallback } from "react";

interface UserData {
  email: string;
  password: string;
}

// Hook para utilizar a autenticação
export const useAuth = () => {
  // Utilizando useQuery para buscar dados do usuário logado
  const { data: user, refetch: refetchUser } = useQuery(
    "user",
    () => Meteor.user(),
    {
      // Opcional: Configurações como staleTime, cacheTime, etc.
    }
  );

  // Mutation para o login
  const login: UseMutationResult<void, Error, UserData> = useMutation(
    ({ email, password }) =>
      new Promise<void>((resolve, reject) => {
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }),
    {
      onSuccess: () => {
        refetchUser();
      },
      // Opcional: onError, onSettled, etc.
    }
  );

  // Mutation para o logout
  const logout: UseMutationResult<void, Error> = useMutation(
    () =>
      new Promise<void>((resolve, reject) => {
        Meteor.logout((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }),
    {
      onSuccess: () => {
        refetchUser();
      },
      // Opcional: onError, onSettled, etc.
    }
  );

  // Mutation para o registro de novos usuários
  const register: UseMutationResult<void, Error, UserData> = useMutation(
    ({ email, password }) =>
      new Promise<void>((resolve, reject) => {
        Accounts.createUser({ email, password }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }),
    {
      onSuccess: () => {
        refetchUser();
      },
      // Opcional: onError, onSettled, etc.
    }
  );

  // Função para verificar se o usuário está logado
  const isLoggedIn = useCallback(() => !!user, [user]);

  return { user, isLoggedIn, login, logout, register };
};
