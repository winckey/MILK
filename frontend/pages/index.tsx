import { Navbar } from "@components/ui/common";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="px-24 pt-32  ml-4 mr-4 min-h-screen w-full">
        {/* hero */}
        <div className="grid grid-cols-2 pb-12">
          {/* 좌측 */}
          <div className="">
            {/* 글자 */}
            <div className="text-5xl md:text-6xs font-extrabold leading-tighter tracking-tighter mb-4">
              <div className=" my-12  bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
                <div>Explore Collect</div>
                <div>and Sell NFTs</div>
              </div>
            </div>
            {/* 버튼 */}
            <div className="">
              <a
                className="
             py-2 px-4 bg-gradient-to-r from-gold to-lightGold text-white font-semibold rounded-2xl shadow-md "
              >
                나는 버튼
              </a>
            </div>
          </div>
          {/* 우측 카드들(미정?) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-lightGold h-[250px]"></div>
            <div className="bg-lightGold h-[250px]"></div>
          </div>
        </div>
        {/* 라이브 경매 */}
        <div className="grid grid-rows-2 pb-4 ">
          {/* 제목 및 버튼 */}
          <div className="flex justify-between ">
            <div className="text-2xl md:text-6xs font-extrabold leading-tighter tracking-tighter mb-4">
              라이브 경매
            </div>

            {/* 이동버튼 */}
            <div className="grid grid-cols-2">
              <div className="rounded-full h-12 w-12 bg-zinc-300 text-center ">
                왼
              </div>
              <div className="rounded-full bg-gold text-center  h-12 w-12">
                오
              </div>
            </div>
          </div>
          {/* 라이브 경매 카드 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-lightGold h-[250px]">d</div>
            <div className="bg-lightGold h-[250px]">d</div>
            <div className="bg-lightGold h-[250px]">s</div>
            <div className="bg-lightGold h-[250px]">s</div>
          </div>
        </div>
        {/* 랭킹 */}
        <div className="grid grid-rows-2 pb-4 ">
          {/* 상단 */}
          <div className="flex justify-between ">
            <div className="text-2xl md:text-6xs font-extrabold leading-tighter tracking-tighter mb-4">
              랭킹
            </div>
            <div>더보기</div>
          </div>
          {/* 하단 */}
          <div>
            <div className="grid grid-cols-5 gap-1 ">
              <div className="bg-lightGold h-[50px] w-[150px]">d</div>
              <div className="bg-lightGold h-[50px] w-[150px]">d</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
              <div className="bg-lightGold h-[50px] w-[150px]">s</div>
            </div>
          </div>
        </div>
        {/* 최하단 */}
        <div>ㅎㅇ</div>
      </div>
    </>
  );
};

export default Home;
