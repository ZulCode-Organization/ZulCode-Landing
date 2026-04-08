import Header from "@/components/blocks/header";
import { Separator } from "@/components/ui/separator";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
}
