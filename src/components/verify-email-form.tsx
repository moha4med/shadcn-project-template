"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

/* Form Validation */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailSchema } from "@/schemas/resetPassword";
import type { VerifyEmailForm } from "@/schemas/resetPassword";

import { useUser } from "@/store/userStore";
import { resetPassword } from "@/services/auth";

/* Components */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  const { setUser } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<VerifyEmailForm>({
    resolver: zodResolver(VerifyEmailSchema),
  })

  const onSubmit = async (data: VerifyEmailForm) => {
    setIsSubmitting(true)

    try {
      const response = await resetPassword(data.email);

      if (response.status !== 200) {
        throw new Error("Failed to send verification code");
      }

      setIsSuccess(true)
      setUser({ id: "", name: "", email: data.email });

      window.location.href = "/auth/reset-password/verify-code";
    } catch (error) {
      console.error("Failed to send verification email:", error)
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("fpd.verifyEmail.title")}</CardTitle>
          <CardDescription>
            {t("fpd.verifyEmail.description",)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("authForm.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  disabled={isSubmitting || isSuccess}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
                {isSubmitting
                  ? t("fpd.verifyEmail.sending")
                  : isSuccess
                    ? t("fpd.verifyEmail.sent")
                    : t("fpd.verifyEmail.button")}
              </Button>

              <div className="text-center text-sm">
                {t("fpd.verifyEmail.rememberPassword")}{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  {t("login.name")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("fpd.verifyEmail.helpText")}{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          {t("contactSupport")}
        </Link>
        .
      </div>
    </div>
  )
}
