"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { useHidratado } from "@/hooks/use-hidratado";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Linguagens", href: "/#linguagens" },
  { name: "Como funciona", href: "/#como-funciona" },
  { name: "Dúvidas", href: "/#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const { resolvedTheme } = useTheme();

  // O logo depende do tema, que só existe no cliente. Usar
  // `resolvedTheme !== undefined` como "montou" quebrava a hidratação: o
  // servidor manda o esqueleto e o cliente já renderiza a imagem no primeiro
  // passo. Este hook garante que os dois comecem iguais.
  const mounted = useHidratado();

  // O fundo é sempre opaco (mesmo tom do resto da página); o que muda ao
  // rolar é só a linha embaixo, que separa o header do conteúdo quando ele
  // passa por baixo.
  useEffect(() => {
    const aoRolar = () => setScrolled(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava o scroll da página com o menu mobile aberto, e fecha sozinho se a
  // tela crescer pra desktop enquanto ele estiver aberto.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 min-h-[64px] bg-background px-4 sm:px-8 flex items-center justify-between border-b transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03]"
          onClick={() => setMenuAberto(false)}
        >
          {!mounted ? (
            <Skeleton className="h-10 w-[140px] rounded-sm" />
          ) : (
            <Image src={logoSrc} alt="ZulCode" width={140} height={40} priority />
          )}
        </Link>
      </div>

      <nav className="hidden sm:flex flex-row gap-1">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <Button variant="link" className="cursor-pointer text-foreground">
              {link.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="h-full flex items-center gap-2 sm:gap-4">
        <Link href="https://zulcode-app.vercel.app/login/" className="hidden sm:block">
          <Button className="zc-press zc-press-shadow">Entrar</Button>
        </Link>
        <ModeToggle />

        <Button
          variant="outline"
          size="icon"
          className="sm:hidden"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((atual) => !atual)}
        >
          {menuAberto ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Painel mobile: nasce logo abaixo do header e cobre o resto da tela
          com fundo sólido — sem isso, os links do nav simplesmente não
          existiam em telas pequenas (sumiam no `hidden sm:flex` de cima). */}
      <div
        className={cn(
          "sm:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background transition-opacity duration-200",
          menuAberto ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className={cn(
                "rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors duration-150 hover:bg-muted",
                menuAberto && "animate-fade-in-up"
              )}
              style={{ animationDelay: menuAberto ? `${index * 60}ms` : undefined }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://zulcode-app.vercel.app/login/"
            onClick={() => setMenuAberto(false)}
            className={cn("mt-2", menuAberto && "animate-fade-in-up")}
            style={{ animationDelay: menuAberto ? `${navLinks.length * 60}ms` : undefined }}
          >
            <Button className="zc-press zc-press-shadow w-full">Entrar</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
