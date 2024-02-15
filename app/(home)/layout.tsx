import type { Metadata } from "next";
import "../globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Add Learn",
  description: "Add Learn LMS Website",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}
