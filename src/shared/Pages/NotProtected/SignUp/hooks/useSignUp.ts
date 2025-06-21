// hooks/useRegister.ts
import { useState } from "react";
import authRepository from "../../../../repositories/auth/authRepository";
import type { RegisterPayload } from "../interfaces/Signup";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: RegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await authRepository.register(data);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
