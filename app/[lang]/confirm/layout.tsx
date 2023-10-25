import { ReduxProvider } from "@/app/_store/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  params,
  children,
}: {
  params: {lang: string},
  children: React.ReactNode;
}) {
  return (


       <main className="bg-white">
       <ReduxProvider>{children}</ReduxProvider>
       </main>

  );
}
