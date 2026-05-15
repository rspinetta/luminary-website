import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminary",
  description: "A global initiative supporting NICU families, accelerating research, and transforming neonatal care worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
