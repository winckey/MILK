// 판매 목록

import type { NextPage } from "next";
import { ProfileLayout, Layout } from "@components/ui/layout";
import { Item } from "@components/ui/common";

const Profile: NextPage = () => {
  // data list
  const nftList = [
    {
      nftId: 1,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 2,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 3,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 4,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 5,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 6,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 7,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
    {
      nftId: 8,
      brand: "LouisVuitton",
      nftName: "가방",
      price: "100",
      imgUrl:
        "https://kr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/%EB%A3%A8%EC%9D%B4-%EB%B9%84%ED%86%B5-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-pm-%EC%97%90%ED%94%BC-%ED%95%B8%EB%93%9C%EB%B0%B1--M58566_PM2_Front%20view.png?imwidth=656&imheight=656",
    },
  ];

  return (
    <Layout seoTitle="프로필">
      <ProfileLayout>
        <div className="border-t">
          <div className="px-[52px] mt-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              {nftList.map((nft) => (
                <Item nft={nft} key={nft.nftId} />
              ))}
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default Profile;
