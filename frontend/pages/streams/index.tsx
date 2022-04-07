import type { NextPage } from "next";
import useSWR from "swr";
import { Layout } from "@components/ui/layout";
import { useRouter } from "wouter";
import Link from "next/link";
import { Item } from "@components/ui/common";

interface DataList {
  roomId: number;
  userId: number;
  nickname: string;
  cfId: string;
  roomName: string;
  runtime: number;
  finish: Boolean;
}
interface StreamsResponse {
  message: string;
  statusCode: number;
  liveDtoList: DataList[];
}

const Streams: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamsResponse>(`${process.env.BASE_URL}/live`);
  // console.log(data?.liveDtoList[0].runtime);
  console.log(data);

  return (
    <Layout seoTitle="개인관">
      <div className="pb-20">
        <div>
          {/* 메인 사진 */}
          <div className="h-[220px] overflow-hidden bg-basicImage shadow-2xl">
            <div className="h-[600px] w-full max-h-full max-w-full">
              <img
                src="https://lh3.googleusercontent.com/7_XGEc0KSA9CHU4L5IxTm9Fc2pef8Hdl_3M5ci-GodpfWoxTOkYdMqsJ2C-tEI0EpHKBwBuedIK95KB_x64I-pTCriyKXkWYScUdOFItce0jCnwWWradnF3DDpv47H7tJpm-kZEjEGhjo1SktlJhwwhGDaxEJgMj-GhvAzQOQU3_B0qAK9fiu-cdjnOHqNdIn5vjHjBFmAzw0hfJlCTRSdVoG1-ckJ8p9fGlIqYNuBeiN18egjkc-6MVb9qgrd4h09Q78Iz1Irtq1_CsZk4_WQebj4YcKFFmOBonYvfA7mUhbeWyRFx9Dm3cGoy0qilbjYP5tTqpcAtsdd55ZdZUbJYb5diyqYJMPGn_uJlI6vfpFpC7F2OPHxu8lzUfTp5FDnD0knGIAqZPO9MMbWTI8bmo82ymwSTO15MaAvuYB7HpiIFNpTE4aOR6PlzmK_kX5_BTzG_5r2aVW5rhXyKDsWOxLZUyhghbpeIfgeobbkdm9kLpF0GN2BXWyLoJ-wS1mVk_niNyGZ5gCcGSX6nmR__pQwbwAEFesCS0kmpkt3a1-LpwLp6Uxl0S8-5U_L7AVlChoG3sqErVYLpl5oLucMaM_lmO6PmxVdiRfDbTwxJhDJzzDnRnDi2VeEU57x9xyxUJmdbrd1GBc-4rrX9xwREt-_rNza2TJkX9zkC6fuVK93LWZJ3R1H2rUSP8qULk8K_3yxfc6XT1f_DF6REdSssVSWl15xesZaY2tpLo7LrmnTEug0AGRJmg2z-u=w798-h294-no?authuser=0"
                alt="#"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
          {/* 메인 글 */}
          <div className="flex flex-col items-center mb-5">
            <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold my-7">
              Explore Luxury goods
            </span>
            <div className="text-center text-textGray p-5">
              <span>
                고유성에 가치를 두는 명품 패션 시장도 NFT 시장에 눈을 돌리기
                시작했습니다.
                <br />
                실물 소재와 제작 과정, 장인 정신과 브랜드 헤리티지에 따라 고가의
                가치가 매겨졌는데,
                <br /> NFT가 대상 하나하나에 고유의 객체라는 존재감을 나타낼 수
                있어서 실물 명품보다 희소성은 우위에 있다고 볼 수 있습니다.
                <br />
                MILC는 세계적인 명품 브랜드와 협업하여 NFT 뿐만 아니라 실물까지
                받을 수 있도록 제공하고 있습니다.
                <br />
                여기서 구매한 NFT를 자유롭게 거래하십시오.
              </span>
            </div>
          </div>
        </div>
        <hr />
        {/* 카드 */}
        <div>
          <p className="text-2xl font-[600] bg-clip-text text-transparent bg-gradient-to-r from-textGray to-textBlack text-center my-10">
            Trending collections
          </p>
          <div className="px-[52px]">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              {/* {data?.}
              <iframe
                className="w-full aspect-video  rounded-md shadow-sm"
                src={`https://iframe.videodelivery.net/${uids}`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              ></iframe> */}
              {/* 진짜감사합니다  */}
              {data?.liveDtoList.map((val) => (
                <Link key={val.cfId} href={`/streams/${val.roomId}`}>
                  <div key={val.cfId}></div>
                  {/* <Item
                    key={val.cfId}
                    enterprise={val.nickname}
                    // imgUrl={val.}
                    likeCount={val.nftId.}
                    nftId={val.}
                    nftName={val.}
                    price={val.}
                    myLike={.}
                  /> */}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streams;
