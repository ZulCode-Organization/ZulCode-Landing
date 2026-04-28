"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaGithub, FaInstagram } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Metodologia", href: "/#metodologia" },
  { name: "Plano", href: "/#planos" },
];

const socialLinks = [
  { icon: <FaGithub className="size-4" />, href: "https://github.com/ZulCode-Organization", name: "GitHub" },
  { icon: <FaInstagram className="size-4" />, href: "https://instagram.com/zulcode", name: "Instagram" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <footer className="max-w-7xl px-6 py-12 bg-background mx-auto">
      <div className="mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between gap-10">
        <div className="flex flex-col gap-6">
          {!mounted ? (
            <Skeleton className="h-10 w-[140px] rounded-sm" />
          ) : (
            <Image
              src={logoSrc}
              alt="ZulCode Logo"
              width={140}
              height={40}
              priority
            />
          )}

          <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
            O melhor jeito de aprender a
            <br />
            programar é praticando!
          </p>

          <nav className="hidden sm:flex flex-row flex-wrap gap-x-1 gap-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="link"
                  className="cursor-pointer text-foreground px-3 py-1 h-auto text-sm font-medium"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026{" "}
          <Link href="/" className="text-primary hover:underline">
            ZulCode
          </Link>
          . Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-label={link.name}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}