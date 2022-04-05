// 판매 목록

import type { NextPage } from "next";
import { ProfileLayout, Layout } from "@components/ui/layout";
import useSWR from "swr";
import { Item } from "@components/ui/common";
import { Nft } from "@components/ui/common/item";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface OwnNftResponse {
  message: string;
  statusCode: number;
  nftDtoList: Nft[];
}

const Profile: NextPage = () => {
  const router = useRouter();

  const [forSaleList, setForSaleList] = useState<Nft[]>();

  // 해당 nickname을 가진 유저의 판매/보유 nft 리스트 가져오기
  const { data } = useSWR<OwnNftResponse>(
    router.query.nickname
      ? `${process.env.BASE_URL}/nft/user/${router.query.nickname}`
      : null
  );

  // 가져온 리스트에서 판매중인 nft만 필터링
  useEffect(() => {
    if (data && data?.statusCode === 200) {
      const tmp = data.nftDtoList.filter((nft) => nft.seleStatus === true);
      setForSaleList(tmp);
    }
  }, [data, router]);

  return (
    <Layout seoTitle="프로필">
      <ProfileLayout>
        <div className="border-t">
          <div className="px-[52px] mt-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4">
              {forSaleList && forSaleList?.length > 0 ? (
                <>
                  {forSaleList?.map((nft) => (
                    <Item
                      key={nft.nftId}
                      enterprise={nft.enterprise}
                      imgUrl={nft.imgUrl}
                      likeCount={nft.likeCount}
                      nftId={nft.nftId}
                      nftName={nft.nftName}
                      price={nft.price}
                    />
                  ))}
                </>
              ) : (
                <div>없어</div>
              )}
            </div>
          </div>
        </div>
      </ProfileLayout>
    </Layout>
  );
};

export default Profile;
