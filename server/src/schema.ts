import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  cPassword: z.string().min(8, { message: "Confirmation password must be at least 8 characters long." })
});


export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
});


export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." })
});


export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  cPassword: z.string().min(8, { message: "Confirmation password must be at least 8 characters long." })
});


export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;