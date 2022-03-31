import { Layout } from "@components/ui/layout";
import Message from "@components/ui/message";
import { NextPage } from "next";

// stream key, stream url => user에게 줄것  strean id -> 비디오 플레이어로 그 video id의 영상 보여줄 것
// 다 String

const Stream: NextPage = () => {
  return (
    // navbar 뒤로가기만 생성
    <Layout seoTitle="라이브 경매">
      <div className="flex justify-center flex-col md:flex-row gap-x-4 min-h-screen">
        <div className="md:w-2/4 pt-5  md:mb-4">
          <div className="flex justify-evenly  md:justify-between px-4 pt-5 text-gray-900">
            <div className="text-3xl font-bold ">방제목</div>
            {/* 브랜드사 클릭하면 해당 상세페이지로 고? */}
            <div className="text-2xl font-semibold">브랜드사</div>
          </div>
          <iframe
            className="aspect-video  w-full border border-gold rounded-md  shadow-sm"
            src={`https://iframe.videodelivery.net/ff65d18100da52b60d8856264234a3b9`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>

          <div className="flex flex-row mt-3 md:h-1/4">
            <div className="mr-4 border-2 bg-slate-400 p-2 md:w-1/4 md:h-3/4 rounded-md ">
              상품이미지
            </div>
            <div className="space-y-2">
              <span className="text-2xl block  text-gray-900">상품 이름</span>
              <span className="text-2xl block text-gray-900">가격</span>
              <p className="text-gray-700">경매시작가: 경매단위: </p>
            </div>
          </div>
        </div>
        {/* 경매열 */}
        <div className="pt-5 md:mt-14 md:w-1/5 space-y-2 md:mb-5">
          {/* 실시간 응찰 내역 */}
          <div className="bg-orange-400 md:h-2/4  p-5 rounded-md flex flex-col space-y-3">
            <span>실시간 응찰</span>
            <span className="text-white">
              <span className="font-medium text-gray-800">username:</span>{" "}
              offer금액
            </span>
          </div>
          {/* 최고가 갱신 */}
          <div className="bg-orange-400 md:h-1/5 p-5 rounded-md flex flex-col space-y-3">
            <span>최고가는 : highmoney 입니다</span>
          </div>
          {/* 응찰하기  */}
          <div className="bg-orange-400 md:h-1/5 p-5 rounded-md flex flex-col space-y-3">
            <span>최고가는 : highmoney 입니다</span>
            <span>최고가는 : highmoney 입니다</span>
            <button>응찰하기</button>
          </div>
        </div>
        {/* 채팅 */}
        <div className="pt-5 md:mt-[55px] md:mb-[90px] md:w-1/5 ">
          <div className="border-2 rounded-md">
            <h2 className="text-2xl py-2 text-center font-bold bg-white  text-gray-900">
              Live Chat
            </h2>
            <div className="py-10 pb-16 h-[72vh]   bg-white px-4 space-y-4">
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="미쳤어" />
            </div>
          </div>
          <div className=" bottom-0 inset-x-0">
            <div className="flex relative  w-full items-center  mx-auto">
              <input
                type="text"
                className="shadow-sm  rounded-md w-full border-gray-300 focus:ring-gold focus:outline-none pr-12 focus:border-lightGold"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-gold rounded-full px-3 hover:bg-gold text-sm text-white">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
