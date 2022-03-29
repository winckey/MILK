// 수정 금지

import Header from "@components/main/Header";
import Head from "next/head";

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
      <div className="min-h-screen w-full bg-lightBg">{children}</div>
    </div>
  );
}
