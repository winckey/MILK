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
          <div className="mt-[30px]">아래</div>
        </div>
      </AccountLayout>
    </Layout>
  );
};
export default Realization;
