import { AccountLayout, Layout } from "@components/ui/layout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  isRealizedItem,
  loadNFTItems,
  loadRealizedItems,
} from "utils/interact";
import useUser, { tokenFetcher } from "@libs/client/useUser";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";
import useSWR from "swr";

declare let window: any;

interface apply {
  applicationDate: string;
  consumer: string;
  enterprise: string;
  nftName: string;
  status: string;
}

interface RealizationListResponse {
  message: string;
  statusCode: number;
  rboardDtoList: apply[];
}

interface IRealizedItems {
  nftId: string;
  address: any;
  image: any;
  name: any;
  description: any;
  edition: any;
  product: any;
  brandName: any;
}

const Realization: NextPage = () => {
  const router = useRouter();
  const brandName = router.query?.name;
  const { user, isLoading } = useUser();
  const [realizedItems, setRealizedItems] = useState<IRealizedItems[]>();
  const [nftItems, setNFTItems] = useState<IRealizedItems[]>();
  const userName = user?.userName;
  const [loading, setLoading] = useState(true);
  const TOKEN = useRecoilValue(accessToken);

  const { data } = useSWR<RealizationListResponse>(
    [`${process.env.BASE_URL}/realization_board/enterpris`, TOKEN],
    tokenFetcher
  );
  console.log(data);

  const isRealized = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const items = await loadRealizedItems(userName, signer);
    const nfts = await loadNFTItems();
    setRealizedItems(items);
    setNFTItems(nfts);
    console.log(items);
  };

  useEffect(() => {
    if (brandName && userName && userName === brandName) {
      if (user?.userRole && user?.userRole !== "ROLE_ENTERPRISE") {
        alert("명품사 전용 페이지 입니다. 명품사 아이디로 로그인해주세요.");
        router.replace("/");
      } else if (user?.userRole && user?.userRole === "ROLE_ENTERPRISE") {
        isRealized();
      } else {
        isRealized();
      }
      isRealized();
    } else if (brandName && userName && userName !== brandName) {
      alert(
        "다른 명품사 페이지입니다. 귀사의 실물화 요청 페이지로 이동해주세요."
      );
      router.replace(`/account/realization/${userName}`);
    } else {
      isRealized();
    }
  }, [userName, setRealizedItems, brandName, isLoading]);

  useEffect(() => {
    if (realizedItems) {
      setLoading(false);
    }
  }, []);

  console.log(realizedItems);
  console.log(nftItems);
  console.log(userName);
  console.log(brandName);

  return (
    <Layout seoTitle="명품관 실물화 처리">
      <AccountLayout>
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
          <div className="mt-9">
            <h1 className="font-semibold text-[40px]">실물화 요청 리스트</h1>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col pb-[50px] w-full">
              <div className="my-5 ">
                <div className="rounded-[10px] bg-white shadow-md ">
                  <div className="px-8 py-5 text-center text-textGray text-xs">
                    {realizedItems?.map((item, idx) => (
                      <>
                        <div className="flex items-center gap-4">
                          <div>{item.name}</div>
                          <img
                            src={item.image}
                            className="w-[50px] h-[50px]"
                            alt=""
                          />
                          <div>{item.edition}</div>
                          <div>{item.address}</div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default Realization;
