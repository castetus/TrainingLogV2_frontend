import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Incorrect email'),

  password: z
    .string()
    .min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Incorrect email'),

  password: z
    .string()
    .min(4, 'Password length should be at least 4'),

  passwordConfirm: z
    .string()
    .min(1, 'Password confirmation is required'),

}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
