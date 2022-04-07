import type { NextPage } from "next";
import useSWR from "swr";
import { Layout } from "@components/ui/layout";
import { useRouter } from "wouter";
import Link from "next/link";
import Item from "@components/ui/stream/card/index";

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
              STREAM NOW
            </span>
            <div className="text-center text-textGray p-5">
              <span>
                브랜드 사의 NFT 한정품을 소장할 수 기회입니다.
                <br />
                MILC는 세계에서 하나뿐인 NFT 제품을{" "}
                <span className="font-semibold">스트리밍으로 경매</span>할 수
                있는 서비스를 제공합니다.
                <br />
                한정된 시간동안 당신의 미래 NFT는 높은 가치로 거듭나고 있습니다.
                <br />
                제품을 실제로 만나보며 사람들의 가치가 모든 담긴,
                <br />
                나의 미래 NFT 제품을 소장하십시오.
              </span>
            </div>
          </div>
        </div>
        <hr />
        {/* 카드 */}
        <div>
          <p className="text-2xl font-[600] bg-clip-text text-transparent bg-gradient-to-r from-textGray to-textBlack text-center my-10">
            Auction List
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
                    // 현재 최고가
                    currentBid={}
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
