import Head from "next/head";
import { Navbar } from "../common";

interface LayoutProps {
  children: React.ReactNode;
  seoTitle?: string;
  canGoBack?: boolean;
}

export default function Layout({ children, seoTitle, canGoBack }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>MILC | {seoTitle}</title>
      </Head>
      <Navbar />
      <div className="min-h-screen w-full pt-[72px] bg-lightBg">{children}</div>
    </div>
  );
}
