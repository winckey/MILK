// import { Navbar } from "@components/ui/common";
import type { NextPage } from "next";

const Ranking: NextPage = () => {
  return (
    <>
      <div className="px-28 pt-32  ml-4 mr-4 min-h-screen w-full">
        {/* 랭킹 및 필터링 */}
        <div className="flex items-center px-12 pb-4 justify-between">
          {/* 좌측 */}
          <div className="">
            {/* 글자 */}
            <div className="text-5xl md:text-6xs font-extrabold leading-tighter tracking-tighter mb-4">
              <div className=" my-12  bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
                <div>Top NFTs 개인</div>
              </div>
            </div>
          </div>
          {/* 우측 버튼들 */}
          <div className=" h-7 flex items-center gap-3 pr-2 ">
            <select
              name="기간"
              className="w-[70%] mb-4 rounded-md border-gray-300"
            >
              <option value="">24시간</option>
              <option value="">7일</option>
            </select>
            <select
              name="기간"
              className="w-[70%] mb-4 rounded-md border-gray-300"
            >
              <option value="">개인관</option>
              <option value="">명품관</option>
            </select>
          </div>
        </div>
        <div className="items-center px-28 pb-8">
          <ul className="flex flex-col justify-center text-center">
            <li>
              <div className="bg-white w-full p-3 border-b-2 grid grid-cols-5 font-bold text-center">
                <div>창작자</div>
                <div>총 판매액</div>
                <div>총 판매액 추이</div>
                <div>거래 횟수</div>
                <div>거래 횟수 추이</div>
              </div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 grid grid-cols-5 h-16 items-center ">
                <div>최소희</div>
                <div>124,533,000원</div>
                <div>그래프</div>
                <div>13번</div>
                <div>그래프</div>
              </div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2  h-16 ">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
            <li>
              <div className="bg-white w-full p-3 border-b-2 h-16">랭킹</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Ranking;
