import type { Metadata } from "next";
import { IBM_Plex_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const comfortaa = Comfortaa({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Oh-My-API 🔥",
  description:
    "Generate your dummy REST API to speed up your app development ⚡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
