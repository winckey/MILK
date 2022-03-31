import Head from "next/head";
import styled from "styled-components";
import { Colors, Devices } from "@components/main/Theme";
import { BsGithub, BsGlobe } from "react-icons/bs";
import Link from "next/link";
import Hero from "@components/main/Home/Hero";
import AOS from "aos";
import Carousel from "@components/main/Home/Carousel";
import TopCollectibles from "@components/main/Home/TopCollectibles";
import { useEffect } from "react";
// hi

const HomeEl = styled.article`
  color: ${Colors.White};
`;

export default function Home() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <HomeEl>
      <Head>
        <meta content="Cleaned create-next-app including styled-components and configured theme" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero />
      dfsdf
      <Carousel />
      <TopCollectibles />
    </HomeEl>
  );
}
