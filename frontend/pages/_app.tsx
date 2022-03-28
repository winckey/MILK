// blueprint
// 페이지에 접근할 때 가장 먼저 보는 곳 (페이지 불러올 때마다 브라우저에서 실행)

import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import Script from "next/script";

import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "@components/main/Theme";
import { useState } from "react";
import Header from "@components/main/Header";
import Button from "@components/main/styled/Button.styled";
import Page from "@components/main/styled/Page.styled";
import Footer from "@components/main/Footer";
import { accessToken } from "@components/atoms/Auth";
import { useRecoilState } from "recoil";

const GlobalStyle = createGlobalStyle`
 

  html,
  body {
    background-color: ${Colors.Background};
    font-family: "Poppins", sans-serif;
    
  }

  p,a,h1,h2,h3,h5,h6,div,span{
    /* color:${Colors.White}; */
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;

  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  /* width */
  body::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  body::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  body::-webkit-scrollbar-thumb {
    background: #212121;
    border-radius: 20px;
  }

  /* Handle on hover */
  body::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

// const MobileMenu = styled.div`
//   background-color: ${Colors.Background};
//   color: ${Colors.White};
//   z-index: ${(p) => (p.open ? "9" : "-1")};
//   position: absolute;
//   padding: 2rem 1rem 1rem 1.2rem;
//   left: 0;
//   display: flex;
//   width: ${(p) => (p.open ? "100%" : "0")};
//   height: 100%;

//   ul {
//     opacity: ${(p) => (p.open ? "1" : "0")};
//     transition: all 0.1s ease-out;
//     text-decoration: none;
//     list-style: none;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     width: 100%;
//   }
// `;

const NavItem = styled.a`
  font-size: 1.2rem;
  font-weight: 400;
`;

// Component: 접근하고자 하는 페이지의 컴포넌트를 가져옴 (pages 폴더에 있는 해당 파일)
function MyApp({ Component, pageProps }: AppProps) {
  const [MobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <RecoilRoot>
        <GlobalStyle />
        <Main>
          <Header mobileMenu={{ MobileMenuIsOpen, setMobileMenuIsOpen }} />
          <Page>
            {/* <MobileMenu open={MobileMenuIsOpen}>
              <ul>
                <li>
                  <NavItem href="/user">개인관</NavItem>
                </li>
                <li>
                  <NavItem href="/brand">명품관</NavItem>
                </li>
                <li>
                  <NavItem href="/stream">라이브 경매</NavItem>
                </li>
                <li>
                  <Button className="bg-gradient-to-r font-bold text-xl from-gold to-lightGold  shadow-md focus:outline-none py-2 px-4 rounded">
                    Create
                  </Button>
                </li>
              </ul>
            </MobileMenu> */}
            <Component {...pageProps} />

            {/* 주소 찾기 */}
            <Script
              src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
              strategy="lazyOnload"
            />
          </Page>
          <Footer />
        </Main>
      </RecoilRoot>
    </SWRConfig>
  );
}

export default MyApp;
