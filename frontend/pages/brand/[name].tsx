import Layout from "@components/ui/layout";
import type { NextPage } from "next";

const brandProfile: NextPage = () => {
  return (
    <Layout seoTitle="명품 프로필">
      <div className="min-h-screen w-full bg-darkBg pb-20">
        {/* 프로필 */}
        <div>
          <div className="relative z-0">
            <div className="h-[600px] overflow-hidden bg-black shadow-lg">
              <div className="h-[600px] w-full max-h-full max-w-full">
                {/* <img
                src="https://lh3.googleusercontent.com/Vw6MpADIga_ZwmXOmclK87L8ax6pI_DylBcn-69kcr1Uhgw5Ij2RvXJD2MFJ0VarfIGeoFZw7NvpGLePX3e2VMztvg7XCQDNo12dLQ=h600"
                className="w-full h-full object-cover "
              /> */}
                <iframe
                  src="https://www.yuca.tv/en/embed/80537a945c7aaa788ccfcdf1b99b5d8f?loop=true&mute=true&autorun=true&_=0.08316564644532853"
                  className="w-full h-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-5">
            <div className="relative -mt-16">
              <div className="inline-flex items-center">
                <div className="h-[130px] w-[130px] bg-basicImage border-2 border-lightBg flex justify-center items-center max-w-full max-h-full overflow-hidden relative rounded-full cursor-pointer shadow-md">
                  <svg
                    className="w-full h-full object-cover bg-white"
                    fill="none"
                    viewBox="0 0 92 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M83.902 15.582V10.23h5.92V7.496h-5.92V3.253h7.341V.518H80.871v17.798H92v-2.733h-8.098zM75.568 19L75.591.495H72.56l.047 11.715L59.3 0l-.024 18.315h3.032l-.049-11.267L75.569 19zm-21.6-.685L53.97.495h-3.03l-.003 17.82h3.031zm-17.355.001H47.15v-2.733h-7.507V.495h-3.031v17.821zm-15.677 0h11.13v-2.733h-8.099V10.23h5.92V7.496h-5.92V3.253h7.342V.518H20.936v17.798zM3.22 9.312c0-3.396 2.368-6.484 6.393-6.484 1.847 0 3.67.66 4.926 1.886l1.61-2.098C15.558 1.91 13.285.094 9.614.094 3.931.094 0 4.384 0 9.382c0 5.116 4.144 9.359 9.945 9.359 2.558 0 4.69-.825 6.324-2.381l-1.398-1.957c-.71.708-2.533 1.627-4.783 1.627-4.05 0-6.867-2.994-6.867-6.718z"
                      fill="#000206"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[40px] text-center px-4 mt-1 bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold">
                CELINE
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
                셀린느(CELINE)는 프랑스 귀족주의의 감성이 묻어나는 세련되고
                우아한 디자인과 실용성을 겸비한 여성 패션을 선보이는 프랑스의
                명품 패션 브랜드입니다.
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <ul className="flex">
              <li>
                <a className="px-[30px] py-5 w-full flex cursor-pointer text-white">
                  <i></i>
                  <span className="font-semibold">판매중</span>
                </a>
              </li>
              <li>
                <a className="px-[30px] py-5 w-full flex cursor-pointer text-[#E5E5E5]">
                  <i></i>
                  <span className="font-semibold">판매현황</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 카드 */}
        <div className="border-t-[1px] border-textGray">
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

export default brandProfile;
