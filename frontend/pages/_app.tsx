// blueprint
// 페이지에 접근할 때 가장 먼저 보는 곳

import "@styles/globals.css";
import type { AppProps } from "next/app";

// Component: 접근하고자 하는 페이지의 컴포넌트를 가져옴 (pages 폴더에 있는 해당 파일)
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full bg-lightBg">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
