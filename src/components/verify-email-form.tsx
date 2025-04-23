"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useState } from "react"

/* Form Validation */
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

/* Components */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Email verification schema
const VerifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type VerifyEmailForm = z.infer<typeof VerifyEmailSchema>

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
      // Here you would implement your email verification logic
      console.log("Sending verification email to:", data.email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      // Redirect to verify code page
      window.location.href = `/auth/verify-code?email=${encodeURIComponent(data.email)}`
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
          <CardTitle className="text-xl">{t("verifyEmail.title", "Verify Your Email")}</CardTitle>
          <CardDescription>
            {t("verifyEmail.subText", "Enter your email address to receive a verification code")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("authForm.email", "Email")}</Label>
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
                  ? t("verifyEmail.sending", "Sending...")
                  : isSuccess
                    ? t("verifyEmail.sent", "Verification Code Sent")
                    : t("verifyEmail.button", "Send Verification Code")}
              </Button>

              <div className="text-center text-sm">
                {t("verifyEmail.rememberPassword", "Remember your password?")}{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  {t("login.name", "Login")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("verifyEmail.helpText", "If you don't receive an email, check your spam folder or")}{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          {t("verifyEmail.contactSupport", "contact support")}
        </Link>
        .
      </div>
    </div>
  )
}
