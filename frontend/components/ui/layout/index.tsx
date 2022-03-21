import Head from "next/head";
import { Navbar } from "../common";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
  seoTitle,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{seoTitle} | Carrot Market</title>
      </Head>
      <Navbar />
      {children}
    </div>
  );
}
