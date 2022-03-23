import Layout from "@components/ui/layout";
import type { NextPage } from "next";
import Image from "next/image";

const Product: NextPage = () => {
  return (
    <Layout seoTitle="제품명">
      <div className="flex flex-col items-center">
        <div className="max-w-full pt-2 px-2 pb-4 lg:px-0 lg:w-[1280px]">
          <div className="flex flex-col">
            {/* 제품 상세 */}
            <div className="flex">
              {/* 좌 */}
              <div className="max-w-[43%] bg-blue-400">
                <div className="m-5 border-[1px] rounded-[10px] overflow-hidden">
                  <div className="p-3 h-[42px] w-full bg-white">
                    <div></div>
                    <div></div>
                  </div>
                  <div>
                    <div className="w-full h-full min-h-[200px] max-h-[1000px] cursor-pointer">
                      <div className="h-full w-full">
                        <div className="h-full w-[600px] flex items-center justify-center max-w-full max-h-full overflow-hidden">
                          <Image
                            src="data:image/jpeg;base64,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"
                            alt="#"
                            className="w-auto h-auto max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 우 */}
              <div className="">우</div>
            </div>

            {/* 액티비티 */}
            <div>activity</div>

            {/* 해당 유저의 다른 아이템 */}
            <div>other items</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
