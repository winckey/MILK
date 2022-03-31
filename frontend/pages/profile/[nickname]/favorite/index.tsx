import type { NextPage } from "next";
import { IndividualProfileLayout, Layout } from "@components/ui/layout";
import Image from "next/image";

const ProfileFavorite: NextPage = () => {
  return (
    <Layout seoTitle="프로필">
      <IndividualProfileLayout>
        <div className="border-t-[1px]">
          <div className="px-[52px] mt-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
              <div className="bg-red-500 h-[300px]"></div>
            </div>
          </div>
        </div>
      </IndividualProfileLayout>
    </Layout>
  );
};

export default ProfileFavorite;
