import { AccountLayout } from "@components/ui/layout";
import Layout from "@components/ui/layout/base";
import { NextPage } from "next";

const Realization: NextPage = () => {
  return (
    <Layout seoTitle="실물화 내역">
      <AccountLayout>
        {/* 우 */}
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
          <div className="mt-9">
            <h1 className="font-semibold text-[40px]">실물화 내역</h1>
          </div>
          {/* 아래 */}
          <div className="mt-[30px]">
            <div className="pb-[100px]">
              <div className="flex flex-col pb-[50px]">
                <div>
                  <p className="font-normal text-textGray">
                    실물화 신청한 상품의 진행 내역을 볼 수 있습니다.
                  </p>
                </div>
                <div className="my-5">
                  <div className="rounded-[10px] bg-white shadow-sm">
                    {/* 리스트 */}
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div className="flex flex-col" key={i}>
                        <div className="flex items-center border-b border-lightBg px-8 py-5 justify-between">
                          <div className="flex space-x-14">
                            <div className="font-semibold">승인대기</div>
                            <div className="space-x-2">
                              <span className="text-gold font-semibold">
                                CHANEL
                              </span>
                              <span>
                                21FW 샤넬 클래식 램스킨 체인 플립백 NFT
                              </span>
                            </div>
                          </div>
                          <div className="text-textGray">2022.03.30</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <span className="font-normal text-textGray">dd</span>
              <div className="border-b mt-10 max-w-[560px]">
                <div className="border-t">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="font-semibold">승인대기</div>
                      <div>d</div>
                    </div>
                    <div>d</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};
export default Realization;
