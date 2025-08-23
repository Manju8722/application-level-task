import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./_components/Layout";
import QueryProvider from "@/context/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Shop Products | E-cart by X-Code",
  description:
    "Browse a wide range of products at E-cart by X-Code. Find the best deals on electronics, fashion, home essentials, and more with fast delivery and secure checkout.",
  keywords: [
    "E-cart",
    "X-Code",
    "online shopping",
    "ecommerce",
    "buy online",
    "electronics",
    "fashion",
    "home essentials",
    "best deals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <NuqsAdapter>
              <Layout>{children}</Layout>
            </NuqsAdapter>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
