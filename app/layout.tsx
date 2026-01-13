import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invoice App - The Best Invoice App in the World",
  description: "Create, manage, and send professional invoices. Just €5 per month. Simple, fast, secure.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
