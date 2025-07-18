import { z } from 'zod';

export const AuthValidations = {
  login: z.object({
    body: z.object({
      email: z
        .string({
          required_error: 'Email is missing',
        })
        .email('Give a valid email'),
      password: z
        .string({
          required_error: 'Password is missing',
        })
        .min(6, 'Password must be at least 6 characters long'),
    }),
  }),

  refreshToken: z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Your session has expired.',
      }),
    }),
  }),

  resetPassword: z.object({
    body: z.object({
      password: z
        .string({ required_error: 'Password is missing' })
        .min(6, 'Password must be 6 characters long'),
    }),
  }),

  loginWith: z.object({
    params: z.object({
      provider: z.enum(['facebook', 'google', 'apple'], {
        errorMap: () => ({
          message: 'Provider must be one of facebook, google, or apple',
        }),
      }),
    }),
  }),
};
