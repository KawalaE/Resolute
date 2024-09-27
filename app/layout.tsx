import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import NavBar from "./NavBar";
import ReactQueryClientProvider from "./ReactQueryClientProvider";
import "./theme-config.css";
import ThemeContextProvider from "./ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resolute",
  description: "Track your issues with Resolute",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ReactQueryClientProvider>
          <AuthProvider>
            <ThemeContextProvider>
              <Theme accentColor="indigo" grayColor="gray">
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </ThemeContextProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
