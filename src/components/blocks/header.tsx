"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Metodologia", href: "/#metodologia" },
  { name: "Plano", href: "/#planos" },
]

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <header className="min-h-[60px] sticky top-0 z-50 px-[32px] flex items-center justify-between bg-background/60 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          {!mounted ? (
            <Skeleton className="h-10 w-[140px] rounded-sm" />
          ) : (
            <Image 
              src={logoSrc} 
              alt="Logo" 
              width={140} 
              height={40} 
              priority
            />
          )}
        </Link>
      </div>
      <nav className="hidden sm:flex flex-row gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
          >
            <Button variant="link" className="cursor-pointer text-foreground">
              {link.name}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="h-full flex items-center gap-4">
        <Link href="https://zul-code-landing.vercel.app/login">
          <Button>Entrar</Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}