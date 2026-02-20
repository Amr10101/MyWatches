import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Watches"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
