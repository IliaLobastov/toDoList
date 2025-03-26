import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3, 'Минимальная длина 3 символа'),
  email: z.string().email('Некорректный email'),
  roleId: z.number().int().positive(),
  themeId: z.number().int().positive(),
});

export type UserType = z.infer<typeof userSchema>;
export type UserSignUpType = Omit<UserType, 'id' | 'roleId' | 'themeId'> & { pass: string };
export type UserLoginType = Pick<UserSignUpType, 'email' | 'pass'>; 
export type UserFromBackendType = { accessToken: string; user: UserType };
export type UserStateType = {status: "featching" | "guest" | "logged"} & Partial<UserType>