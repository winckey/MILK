import Layout from "@components/ui/layout/base";
import { NextPage } from "next";

const Realization: NextPage = () => {
  return (
    <Layout seoTitle="실물화 내역">
      <div>
        <div className="flex items-stretch">
          {/* 좌 */}
          <div className="px-3 min-w-[250px] border-r">
            <ul className="px-2">
              <div className="px-[10px] py-2">
                <p className="font-bold text-xs text-textGray uppercase my-3 tracking-[1px]">
                  Settings
                </p>
              </div>
              <li className="w-full">
                <a className="w-full p-4 rounded-[10px] hover:bg-lightGold flex text-textGray hover:text-textBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 mr-3 text-left font-semibold">
                    프로필 수정
                  </span>
                </a>
              </li>
              <li className="w-full">
                <a className="w-full p-4 rounded-[10px] hover:bg-lightGold flex text-textGray hover:text-textBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                      clipRule="evenodd"
                    />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                  <span className="ml-4 mr-3 text-left font-semibold">
                    실물화 내역
                  </span>
                </a>
              </li>
              <li className="w-full">
                <a className="w-full p-4 rounded-[10px] hover:bg-lightGold flex text-textGray hover:text-textBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="ml-4 mr-3 text-left font-semibold">
                    알림
                  </span>
                </a>
              </li>
              <li className="w-full">
                <a className="w-full p-4 rounded-[10px] hover:bg-lightGold flex text-textGray hover:text-textBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 mr-3 text-left font-semibold">
                    1:1 문의하기
                  </span>
                </a>
              </li>
              <li className="w-full">
                <a className="w-full p-4 rounded-[10px] hover:bg-lightGold flex text-textGray hover:text-textBlack">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="ml-4 mr-3 text-left font-semibold">
                    수익
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* 우 */}
          <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
            <div className="flex flex-wrap justify-between mt-9">
              <h1 className="font-semibold text-[40px]">실물화 내역</h1>
              <div className="flex items-center">
                <a className="px-5 py-3 inline-flex flex-row items-center justify-center font-semibold rounded-[10px] bg-white text-textGray border hover:text-textBlack hover:shadow-lg cursor-pointer">
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Preview
                </a>
              </div>
            </div>
            {/* 아래 */}
            <div className="mt-[30px]">아래</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Realization;
