import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "AWS Certified Cloud Practitioner (CLF-C02) Mock Exam | Sathyabama Institute of Science and Technology",
  description:
    "Production-grade practice examination web application for the AWS Cloud Practitioner Week Long Workshop at Sathyabama Institute of Science and Technology, Chennai. 65 original CLF-C02 questions, 90-minute live timer, instant score calculation.",
  keywords: [
    "AWS Certified Cloud Practitioner",
    "CLF-C02",
    "Mock Exam",
    "Sathyabama Institute of Science and Technology",
    "Cloud Computing Workshop",
    "Practice Test",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-aws-dark text-aws-text antialiased selection:bg-aws-orange/30">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
