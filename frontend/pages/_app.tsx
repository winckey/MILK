import "@styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] pb-10">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
