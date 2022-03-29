import { Layout } from "@components/ui/layout";
import type { NextPage } from "next";

const userProfile: NextPage = () => {
  return (
    <Layout seoTitle="개인 프로필">
      <div className="pb-20">
        {/* 프로필 */}
        <div>
          <div className="relative z-0">
            <div className="h-[225px] overflow-hidden bg-basicImage shadow-lg">
              <div className="h-[600px] w-full max-h-full max-w-full">
                {/* <img
                src="https://lh3.googleusercontent.com/Vw6MpADIga_ZwmXOmclK87L8ax6pI_DylBcn-69kcr1Uhgw5Ij2RvXJD2MFJ0VarfIGeoFZw7NvpGLePX3e2VMztvg7XCQDNo12dLQ=h600"
                className="w-full h-full object-cover "
              /> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-5">
            <div className="relative -mt-16">
              <div className="inline-flex items-center">
                <div className="h-[130px] w-[130px] bg-basicImage border-2 border-lightBg flex justify-center items-center max-w-full max-h-full overflow-hidden relative rounded-full cursor-pointer shadow-md">
                  {/* <img
                  src="https://lh3.googleusercontent.com/Vw6MpADIga_ZwmXOmclK87L8ax6pI_DylBcn-69kcr1Uhgw5Ij2RvXJD2MFJ0VarfIGeoFZw7NvpGLePX3e2VMztvg7XCQDNo12dLQ=h600"
                  className="w-full h-full object-cover "
                /> */}
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[40px] text-textBlack text-center px-4 mt-1">
                won
              </p>
            </div>
            {/* <div className="mt-4">
            <div className="flex flex-wrap border-[1px] rounded-[10px] items-center">
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div>
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
            </div>
          </div> */}
            <div className="break-words p-5 text-textGray text-center max-w-[800px]">
              <span>
                안녕하세요. 장원종입니다.
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <ul className="flex">
              <li>
                <a className="px-[30px] py-5 w-full flex cursor-pointer text-[#353840]">
                  <i></i>
                  <span className="font-semibold">판매중</span>
                </a>
              </li>
              <li>
                <a className="px-[30px] py-5 w-full flex cursor-pointer text-textGray">
                  <i></i>
                  <span className="font-semibold">보유중</span>
                </a>
              </li>
              <li>
                <a className="px-[30px] py-5 w-full flex cursor-pointer text-textGray">
                  <i></i>
                  <span className="font-semibold">관심</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 카드 */}
        <div className="border-t-[1px]">
          <div className="px-[52px] mt-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
              <div className="bg-blue-500 h-[300px]"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default userProfile;
