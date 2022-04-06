import { Layout } from "@components/ui/layout";
import type { NextPage } from "next";

const Realization: NextPage = () => {
  return (
    <Layout seoTitle="명품관 실물화 처리">
      <div className="min-h-screen w-full bg-darkBg">
        <div className="py-[100px] text-center">
          <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold">
            Luxury goods Store
          </span>
        </div>
        <div className="p-[52px]">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 md:grid-rows-10 md:grid-flow-col gap-8"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Realization;
