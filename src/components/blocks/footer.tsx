"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useHidratado } from "@/hooks/use-hidratado";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const navLinks = [
  { name: "Linguagens", href: "/#linguagens" },
  { name: "Como funciona", href: "/#como-funciona" },
  { name: "Metodologia", href: "/#metodologia" },
  { name: "Dúvidas", href: "/#faq" },
];

const socialLinks = [
  { icon: <FaGithub className="size-4" />, href: "https://github.com/ZulCode-Organization", name: "GitHub" },
  { icon: <FaInstagram className="size-4" />, href: "https://instagram.com/zulcode", name: "Instagram" },
  { icon: <FaTiktok className="size-4" />, href: "https://www.tiktok.com/@zul_code", name: "TikTok" },
];

export default function Footer() {
  const { resolvedTheme } = useTheme();

  // Mesmo cuidado do Header: só troca o esqueleto pelo logo depois da
  // hidratação, senão as árvores do servidor e do cliente não batem.
  const mounted = useHidratado();
  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <footer className="w-full border-t border-border bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row justify-between gap-10">
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

        <div className="flex sm:flex-col items-start gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Redes
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                {link.icon}
              </Link>
            ))}
          </div>
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
      </div>
    </footer>
  );
}
