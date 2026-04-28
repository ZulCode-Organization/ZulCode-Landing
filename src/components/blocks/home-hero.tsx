"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="banner" 
      className="py-12 px-4 sm:px-[100px] lg:px-[200px] flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex flex-col gap-2 px-4 md:px-0">
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            Aprenda a codar<br />
            com <span className="text-primary">ZulCode</span><br />
            de graça.
          </h1>
          <p className="text-lg text-muted-foreground hidden md:block max-w-lg">
            A melhor e mais divertida forma de aprender a programar é com o Zul Code.
          </p>
        </div>
        
        <div className="hidden md:flex mt-8 gap-4">
          <Link href="https://zul-code-landing.vercel.app/login">
            <Button size="hero">COMEÇAR AGORA</Button>
          </Link>
          <Link href="https://zul-code-landing.vercel.app/login">
            <Button variant="outline" size="hero">JÁ TENHO UMA CONTA</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-9 w-full md:w-auto">
        {!mounted ? (
          <Skeleton className="h-[610px] w-[300px] rounded-xl" />
        ) : (
          <Image
            src="/print-hero.svg"
            alt="Hero Image"
            width={300}
            height={300}
            priority
            className="object-contain"
          />
        )}
        
        <div className="flex flex-col gap-4 w-full md:hidden">
          <Link href="https://zul-code-landing.vercel.app/login">
            <Button size="mobile" className="w-full">COMEÇAR AGORA</Button>
          </Link>
          <Link href="https://zul-code-landing.vercel.app/login">
            <Button variant="outline" size="mobile" className="w-full">JÁ TENHO UMA CONTA</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}