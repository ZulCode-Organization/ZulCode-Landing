import Header from "@/components/blocks/header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
}
