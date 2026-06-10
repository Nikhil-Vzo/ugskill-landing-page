import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGSkill -- Campus Upskilling & Recruitment Platform",
  description: "The all-in-one LMS, Exam, and Placement engine that connects student learning directly to corporate readiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
