import Layout from "@components/ui/layout";
import { NextPage } from "next";

const Realization: NextPage = () => {
  return (
    <Layout seoTitle="실물화 내역">
      <div>
        <div className="flex pt-20">
          <div className="w-[25%] hidden lg:block">
            <div className="py-8 pl-16 text-2xl font-bold">계정 설정</div>
            <div className="flex flex-col">
              <div className="pl-16">
                <div className="flex w-[70%] p-2 text-white bg-gradient-to-r from-gold to-lightGold rounded-md">
                  <div className="pr-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <button className="font-bold">프로필</button>
                  </div>
                </div>
              </div>
              <div className="pl-16">
                <div className="flex w-[70%] p-2 rounded-md text-textGray focus:text-white focus:bg-gradient-to-r from-gold to-lightGold">
                  <div className="pr-2">
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
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <button className="font-bold">알림</button>
                  </div>
                </div>
              </div>
              <div className="pl-16 ">
                <div className="flex w-[70%] p-2 rounded-md text-textGray">
                  <div className="pr-2">
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <button className="font-bold">1:1 문의</button>
                  </div>
                </div>
              </div>
              <div className="pl-16 ">
                <div className="flex w-[70%] p-2 rounded-md text-textGray">
                  <div className="pr-2">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <button className="font-bold">수익</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[75%]"></div>
        </div>
      </div>
    </Layout>
  );
};
export default Realization;
