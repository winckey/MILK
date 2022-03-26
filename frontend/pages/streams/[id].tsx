import Layout from "@components/ui/layout";
import Message from "@components/ui/message";
import { NextPage } from "next";

// stream key, stream url => user에게 줄것  strean id -> 비디오 플레이어로 그 video id의 영상 보여줄 것
// 다 String

const Stream: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-evenly items-start py-10   space-y-4">
        <div className="w-2/4 ">
          {[1, 2, 3, 4, 5] ? (
            <iframe
              className="aspect-video w-full border border-gold rounded-md  shadow-sm"
              src={`https://iframe.videodelivery.net/ff65d18100da52b60d8856264234a3b9`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          ) : null}

          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">제목</h1>
            <span className="text-2xl block mt-3 text-gray-900">상품 이름</span>
            <span className="text-2xl block mt-3 text-gray-900">가격</span>
            <p className=" my-6 text-gray-700">경매시작가: 경매단위: </p>
          </div>
        </div>
        <div>
          <div className="bg-orange-400  p-5 rounded-md  flex flex-col space-y-3">
            <span>Stream Keys (secret)</span>
            <span className="text-white">
              <span className="font-medium text-gray-800">URL:</span> url 적기
            </span>
            <span className="text-white">
              <span className="font-medium text-gray-800">Key:</span> key
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-center font-bold py-3 text-gray-900">
            Live Chat
          </h2>
          <div className="py-10 pb-16 h-[50vh]   px-4 space-y-4">
            <Message message="Hi how much are you selling them for?" />
            <Message message="I want ￦20,000" reversed />
            <Message message="미쳤어" />
          </div>
          <div className=" py-2 bg-white rounded-md bottom-0 inset-x-0">
            <div className="flex relative  w-full items-center  mx-auto">
              <input
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
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
