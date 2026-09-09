import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
  
const prompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["thai","latin"],
});

export const metadata: Metadata = {
  title: "Task-App-By-Shonext",
  description: "เช็คลิสต์งานที่ต้องทำในแต่ละวันของคุณ",
  keywords: ["Task-App", "Next.js", "Shonext", "Checklist", "Productivity"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prompt.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
