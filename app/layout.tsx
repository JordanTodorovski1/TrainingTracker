import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Training Tracker",
  description: "Track your trainings and gym progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
