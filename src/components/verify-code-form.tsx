"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
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

// Verification code schema
const VerifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
})

type VerifyCodeForm = z.infer<typeof VerifyCodeSchema>

export function VerifyCodeForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  // Create refs for each digit input
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null, null, null])
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""))

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<VerifyCodeForm>({
    resolver: zodResolver(VerifyCodeSchema),
  })

  // Update the form value when verification code changes
  useEffect(() => {
    setValue("code", verificationCode.join(""))
  }, [verificationCode, setValue])

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value.slice(-1) // Only take the last character if multiple are pasted
    setVerificationCode(newCode)

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit = async (data: VerifyCodeForm) => {
    setIsSubmitting(true)

    try {
      // Here you would implement your code verification logic
      console.log("Verifying code:", data.code, "for email:", email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to reset password page
      window.location.href = `/auth/reset-password?email=${encodeURIComponent(email)}&code=${data.code}`
    } catch (error) {
      console.error("Failed to verify code:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("verifyCode.title", "Enter Verification Code")}</CardTitle>
          <CardDescription>
            {t("verifyCode.subText", "We've sent a 6-digit code to")} {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="code" className="sr-only">
                  {t("verifyCode.code", "Verification Code")}
                </Label>
                <input type="hidden" {...register("code")} />

                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="h-12 w-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isSubmitting}
                    />
                  ))}
                </div>
                {errors.code && <p className="text-red-500 text-sm text-center mt-2">{errors.code.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || verificationCode.join("").length !== 6}
              >
                {isSubmitting ? t("verifyCode.verifying", "Verifying...") : t("verifyCode.button", "Verify Code")}
              </Button>

              <div className="text-center text-sm">
                {t("verifyCode.noCode", "Didn't receive a code?")}{" "}
                <Link
                  href={`/auth/verify-email?email=${encodeURIComponent(email)}`}
                  className="underline underline-offset-4"
                >
                  {t("verifyCode.resend", "Resend")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("verifyCode.helpText", "The verification code will expire in 10 minutes")}
      </div>
    </div>
  )
}
