export const siteConfig = {
  name: "Login",
  url: "https://localhost:3000",
  description: "",
  baseLinks: {
    home: "/",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
    verifyCode: "/auth/verify-code",
  },
};

export type siteConfig = typeof siteConfig;
