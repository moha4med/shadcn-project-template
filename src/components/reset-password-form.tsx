"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";

/* Form Validation */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas/resetPassword";
import type { ResetPasswordForm } from "@/schemas/resetPassword";

import { useUser } from "@/store/userStore";
import { updatePassword } from "@/services/auth";

/* Components */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  const { user } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordForm) => {
    setIsSubmitting(true)

    try {
      const response = await updatePassword(user[0]?.email, data.password);

      if (response.status !== 200) {
        throw new Error("Failed to update password");
      }
      
      setIsSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000)
    } catch (error) {
      console.error("Failed to reset password:", error)
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("fpd.resetPassword.title")}</CardTitle>
          <CardDescription>{t("fpd.resetPassword.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium">{t("fpd.resetPassword.success")}</h3>
              <p className="text-muted-foreground">{t("fpd.resetPassword.redirecting")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">{t("authForm.newPassword")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">{t("authForm.confirmPassword")}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("fpd.resetPassword.requirements")}:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                    <li>{t("fpd.resetPassword.req1")}</li>
                    <li>{t("fpd.resetPassword.req2")}</li>
                    <li>{t("fpd.resetPassword.req3")}</li>
                    <li>{t("fpd.resetPassword.req4")}</li>
                    <li>{t("fpd.resetPassword.req5")}</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? t("fpd.resetPassword.resetting")
                    : t("fpd.resetPassword.button")}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("resetPassword.helpText")}
      </div>
    </div>
  )
}
