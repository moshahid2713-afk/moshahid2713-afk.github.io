import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Shahid | CSE Student & Developer",
  description: "Portfolio of Mohammed Shahid, a B.Tech Computer Science student focused on software development, Data Structures & Algorithms, problem solving and emerging technologies.",
  openGraph: {
    title: "Mohammed Shahid | CSE Student & Developer",
    description: "A developer's digital workspace: projects, problem solving, and the path through B.Tech CSE.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
