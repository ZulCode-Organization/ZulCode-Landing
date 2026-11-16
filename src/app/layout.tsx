import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/links";
import { ThemeProvider } from "@/components/theme-provider";
import { AvisoAndroid } from "@/components/blocks/aviso-android";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRICAO =
  "Aprenda a programar de graça com lições curtas, desafios de código de verdade e uma trilha gamificada. No navegador e no app para Android.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Aprender a programar grátis, jogando | ZulCode", template: "%s | ZulCode" },
  description: DESCRICAO,
  alternates: { canonical: "/" },
  applicationName: "ZulCode",
  keywords: ["aprender a programar", "aprender programação", "curso de programação grátis", "app para aprender programação", "Python", "JavaScript", "TypeScript", "Java", "C#", "Go"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "ZulCode",
    title: "Aprender a programar grátis, jogando | ZulCode",
    description: DESCRICAO,
    images: [{ url: "/mascot.png", alt: "O Zul, mascote do ZulCode" }],
  },
  twitter: { card: "summary_large_image", title: "Aprender a programar grátis, jogando | ZulCode", description: DESCRICAO, images: ["/mascot.png"] },
  /* O Google usa o ícone no resultado da busca e prefere um PNG quadrado com
     lado múltiplo de 48 px: o de 192 px é o que ele pega. */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
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
          <AvisoAndroid />
        </ThemeProvider>
      </body>
    </html>
  );
}
