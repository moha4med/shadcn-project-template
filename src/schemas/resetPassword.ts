import { z } from "zod";

/* Email verification schema */
// This schema validates that the email is a string and follows a valid email format
export const VerifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"), 
});

// Define a TypeScript type for the validated schema
export type VerifyEmailForme = z.infer<typeof VerifyEmailSchema>;


/* "Verification code" verification schema */
// This schema validates a numeric code to ensure it is exactly 4 digits long.
export const VerifyCodeSchema = z.object({
  code: z
    .number()
    .int() // Ensures the code is an integer
    .min(4, { message: "Code must be at least 4 digits" }) // Minimum value of 4
    .max(4, { message: "Code must be at most 4 digits" }), // Maximum value of 4
});

// Define a TypeScript type for the validated schema
export type VerifyCodeForme = z.infer<typeof VerifyCodeSchema>;


/* Reset password verification schema */
// This schema validates a password reset form with the following rules:
// - Password must be at least 8 characters long
// - Password must contain at least one uppercase letter
// - Password must contain at least one lowercase letter
// - Password must contain at least one number
// - Password must contain at least one special character
// - Password and confirmPassword fields must match
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length of 8 characters
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter", // At least one uppercase letter
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter", // At least one lowercase letter
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }) // At least one number
      .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, {
        message: "Password must contain at least one special character", // At least one special character
      }),

    confirmPassword: z.string(), // Validate the confirm password field
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match", // Ensures password and confirmPassword are the same
    path: ["confirmPassword"], // Error path for the confirmPassword field
  });

// Define a TypeScript type for the validated schema
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
