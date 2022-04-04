// 판매 현황

import type { NextPage } from "next";
import { ProfileLayout, Layout } from "@components/ui/layout";
import { Item } from "@components/ui/common";

const ProfileActivity: NextPage = () => {
  return (
    <Layout seoTitle="프로필">
      <ProfileLayout>
        <div className="border-t">
          <div className="px-[52px] mt-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              <div>없어</div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default ProfileActivity;
