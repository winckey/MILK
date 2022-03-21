import { Navbar } from "@components/ui/common";
import { useState } from "react";

export default function Login() {
  return (
    <>
      <div>
        <div className="fixed">
          <Navbar />
        </div>
        <div className="flex items-center pt-20">
          <div className="flex flex-row justify-center items-center w-[50%] min-h-screen bg-gradient-to-r from-gold to-lightGold">
            <div className="flex flex-col justify-center text-left">
              <div className="text-4xl lg:text-5xl text-white font-bold pb-10">
                <div>최고의 명품을</div>
                <div>NFT로 만나보세요!</div>
              </div>
              <div className="text-white font-bold pb-10 lg:text-xl">
                On the World's Best & Largest NFT MarketPlace
              </div>
              <div className="flex justify-between">
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 1</h1>
                </div>
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 2</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="px-16 w-[50%]">
            <div className="text-3xl font-bold ">
              <h3>MILC에 오신 것을</h3>
              <h3>환영합니다</h3>
            </div>
            <div className="py-4 ">
              <div>
                <div>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white items-center rounded mb-6 pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex itecms-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="이메일"
                    />
                  </div>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white items-center rounded mb-6 pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex itecms-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="비밀번호"
                    />
                  </div>
                </div>
                <div className="my-8">
                  <button
                    // onClick={}
                    className="w-full flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
                  >
                    로그인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
