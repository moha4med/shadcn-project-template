"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/* Form Validation */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/registerSchema";
import type { RegisterForm } from "@/schemas/registerSchema";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUser } from "@/store/userStore";

/* Components */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation()
  const { setUser } = useUser()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    console.log("User data: ", data)

    try {
      const { email, password, firstName, lastName } = data
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Set user data with first and last name
      setUser({
        id: user.uid,
        name: `${firstName} ${lastName}`,
        email: user.email || "",
      })

      // Redirect to home page after successful registration
      window.location.href = "/"
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      setUser({ id: user.uid, name: user.displayName || "", email: user.email || "" })
      window.location.href = "/"
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google signup failed:", error.message)
      } else {
        console.error("Google signup failed:", error)
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("register.title")}</CardTitle>
          <CardDescription>{t("register.subText")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("register.googleSignup")}
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">{t("or")}</span>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="firstName">{t("authForm.firstName")}</Label>
                    <Input id="firstName" type="text" placeholder="John" {...register("firstName")} />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lastName">{t("authForm.lastName")}</Label>
                    <Input id="lastName" type="text" placeholder="Doe" {...register("lastName")} />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">{t("authForm.email")}</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">{t("authForm.password")}</Label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">{t("authForm.confirmPassword")}</Label>
                  <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit" className="w-full" onClick={handleSubmit(onSubmit)}>
                  {t("register.button")}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  {t("login.name")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("register.agreeToTerms")}{" "}
        <a href="#">{t("termsOfService")}</a> and{" "}
        <a href="#">{t("privacyPolicy")}</a>.
      </div>
    </div>
  )
}
