"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

/* Form Validation */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyCodeSchema } from "@/schemas/resetPassword";
import type { VerifyCodeForm } from "@/schemas/resetPassword";

import { useUser } from "@/store/userStore";
import { verifyCode } from "@/services/auth";

/* Components */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function VerifyCodeForm({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  const { user } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create refs for each digit input
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null, null, null])
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(""))

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
    if (value && index < 3) {
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
      const response = await verifyCode(user[0]?.email, data.code);

      if (response.status !== 200) {
        throw new Error("Failed to verify code");
      }

      window.location.href = "/auth/forgot-password/reset-password";
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
          <CardTitle className="text-xl">{t("fpd.verifyCode.title")}</CardTitle>
          <CardDescription>
            {t("fpd.verifyCode.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="code" className="sr-only">
                  {t("authForm.VerificationCode")}
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
                {isSubmitting ? t("fpd.verifyCode.verifying") : t("fpd.verifyCode.button")}
              </Button>

              <div className="text-center text-sm">
                {t("fpd.verifyCode.noCode")}{" "}
                <Link
                  href="/auth/forgot-password/verify-email"
                  className="underline underline-offset-4"
                >
                  {t("fpd.verifyCode.resend")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("fpd.verifyCode.helpText")}
      </div>
    </div>
  )
}
