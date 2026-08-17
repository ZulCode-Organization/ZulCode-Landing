import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZulCode",
  description: "A melhor forma de aprender a programar é praticando. E o Zul Code é a melhor plataforma para isso.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      {/* Fundo chapado, sem cena atrás da página: cada bloco de conteúdo tem a
          própria superfície opaca, igual à tela de login do app. */}
      <body className="min-h-full flex flex-col bg-background">
        {/* Mesma configuração de tema do app (segue o sistema, com o botão de
            tema podendo sobrescrever), pra landing e login abrirem iguais. */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
