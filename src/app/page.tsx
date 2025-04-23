"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

/* Components */
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";

/* Icons */
import { RiArrowRightLine } from "@remixicon/react";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-center items-center">
        <Header
          title={t("title")}
          description={t("description")}
        />
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-8 sm:p-20">
        <Button asChild className="group mt-8" variant="outline">
          <Link href="/auth/login">
            {t("homeButton")}
            <RiArrowRightLine
              className="ml-1.5 size-5 text-gray-900 dark:text-gray-50"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </main>
    </div>
  );
}

export default Home;
