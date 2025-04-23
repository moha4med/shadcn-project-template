"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

/* Form Validation */
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

/* Components */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

// Reset password schema
const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const code = searchParams.get("code") || ""

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
      // Here you would implement your password reset logic
      console.log("Resetting password for:", email, "with code:", code, "new password:", data.password)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)

      // Redirect to login page after a delay
      setTimeout(() => {
        window.location.href = "/auth/login"
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
          <CardTitle className="text-xl">{t("resetPassword.title", "Reset Your Password")}</CardTitle>
          <CardDescription>{t("resetPassword.subText", "Create a new password for your account")}</CardDescription>
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
              <h3 className="text-lg font-medium">{t("resetPassword.success", "Password Reset Successfully")}</h3>
              <p className="text-muted-foreground">{t("resetPassword.redirecting", "Redirecting to login page...")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">{t("authForm.newPassword", "New Password")}</Label>
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
                  <Label htmlFor="confirmPassword">{t("authForm.confirmPassword", "Confirm Password")}</Label>
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
                    {t("resetPassword.requirements", "Password Requirements")}:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                    <li>{t("resetPassword.req1", "At least 8 characters")}</li>
                    <li>{t("resetPassword.req2", "At least one uppercase letter")}</li>
                    <li>{t("resetPassword.req3", "At least one lowercase letter")}</li>
                    <li>{t("resetPassword.req4", "At least one number")}</li>
                    <li>{t("resetPassword.req5", "At least one special character")}</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? t("resetPassword.resetting", "Resetting...")
                    : t("resetPassword.button", "Reset Password")}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t(
          "resetPassword.helpText",
          "For security reasons, your password must meet all the requirements listed above.",
        )}
      </div>
    </div>
  )
}
