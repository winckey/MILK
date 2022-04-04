import { Layout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { RealizationModal } from "@components/ui/realization";
import { ethers } from "ethers";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
// import Image from "next/image";
import { useRouter } from "next/router";
import {
  findNFT,
  loadMarketItems,
  marketContract,
  nftContract,
} from "utils/interact";
import ThreeDimension from "@components/ui/image";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { useLocation } from "wouter";
import { SellModal } from "@components/ui/sell";

declare let window: any;

interface IResponse {
  nftId: string;
  address: any;
  image: any;
  name: any;
  description: any;
  edition: any;
  product: any;
  nickname: any;
}

const Product: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  // console.log(user);

  const nftId = router.query?.id?.toString();
  const [isOwner, setIsOwner] = useState(false); // 본인 상품인지 여부
  const [selectedOrder, setSelectedOrder] = useState<null | object>(null);
  const [selectedRealization, setSelectedRealization] = useState<null | object>(
    null
  );
  const [selectedSell, setSelectedSell] = useState<null | object>(null);
  const [marketplace, setMarketplace] = useState({});
  const [nft, setNFT] = useState({});
  const [itemId, setItemId] = useState(0);
  const [name, setName] = useState("");
  const [ethUSD, setEthUSD] = useState(0);
  const [exchange, setExchange] = useState(0);

  const cleanupModal = () => {
    setSelectedRealization(null);
    setSelectedOrder(null);
    setSelectedSell(null);
  };

  // 관이 part
  // const brand = "Celine";
  console.log(router);
  console.log(nftId);
  console.log(typeof nftId);
  // console.log(router);
  // console.log(image);
  // console.log(typeof image);

  // router에서 받아온 id로 요청 후 받은 데이터 (임시 참고용)
  // const nftId = router.query.nftId?.toString();
  const [response, setResponse] = useState<IResponse | undefined>();

  const getNFT = async () => {
    const res = await findNFT(nftId);
    console.log(res);
    setResponse(Object(res));
    // return res;
  };

  const resp = async () => {
    await getNFT();
  };

  // const response = getNFT();
  // const res3 = async () => {
  //   const res = await findNFT(nftId);
  //   let resp = [];
  //   resp?.push({
  //     nftId: nftId,
  //     address: res?.address.toString(),
  //     image: res?.image.toString(),
  //     name: res?.name.toString(),
  //     description: res?.description.toString(),
  //     edition: res?.edition,
  //     product: res?.product,
  //     nickname: res?.nickname.toString(),
  //   });
  //   setResponse(resp);
  // };

  console.log(response);

  // console.log(response);
  // const nftres = async () => {
  //   const res = await getNFT(nftId).then((res) => setResponse(res));
  // };
  // const res3 = await getNFT(nftId);
  // console.log(res3);
  // setResponse(res3);
  // console.log(response);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://api.coinpaprika.com/v1/tickers/eth-ethereum"
      );
      const json = await res.json();
      // console.log(json);
      setEthUSD(json.quotes.USD.price);
      const res2 = await fetch(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      );
      const json2 = await res2.json();
      setExchange(json2[0].basePrice);
      resp();
    })();
  }, [nftId]);

  const loadContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const res1 = await marketContract(signer);
    const res2 = await nftContract(signer);
    // setitems(items);
    setMarketplace(res1);
    setNFT(res2);
    // setLoading(false);
    // setId(items.id);
    // console.log(id);
    // console.log(marketplace);
  };

  // const buyMarketItem = async (item) => {
  //   await (
  //     await marketplace.purchaseItem(item.itemid, { value: item.totalPrice })
  //   ).wait();
  // };

  return (
    <Layout seoTitle="제품명">
      <div className="flex flex-col items-center">
        <div className="max-w-full pt-2 px-2 pb-4 lg:px-0 lg:w-[1280px]">
          <div className="flex flex-col">
            {/* 제품 상세 */}
            <div className="flex">
              {/* 좌 */}
              <div className="max-w-[43%]">
                {/* image */}
                <div className="m-5 rounded-[10px] overflow-hidden shadow-lg">
                  {/* icon bar */}
                  <div className="p-3 h-[42px] w-full bg-white flex justify-between items-center border-b-[1px] border-lightBg">
                    <div>
                      <div className="flex items-center">
                        <svg
                          className="w-3"
                          fill="gray"
                          viewBox="-38.39985 -104.22675 332.7987 625.3605"
                        >
                          <path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"></path>
                          <path d="M127.962 287.959V0L0 212.32z"></path>
                          <path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"></path>
                          <path d="M0 236.585l127.962 180.32v-104.72z"></path>
                          <path d="M127.961 154.159v133.799l127.96-75.637z"></path>
                          <path d="M127.96 154.159L0 212.32l127.96 75.637z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5"
                          viewBox="0 0 20 20"
                          fill="#C19A77"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                            clipRule="evenodd"
                          />
                          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                        </svg>
                      </div>
                      <div className="flex mx-[3px]">
                        <button>
                          <svg
                            className="w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="gray"
                            aria-hidden="true"
                          >
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs font-medium text-textGray">23</p>
                    </div>
                  </div>
                  {/* image */}

                  <div>
                    <div className="w-full h-full min-h-[200px] max-h-[1000px] cursor-pointer">
                      <div className="h-full w-full">
                        <div className="h-full w-[600px] flex items-center justify-center max-w-full max-h-full overflow-hidden">
                          <img
                            src={response?.image}
                            alt="#"
                            className="w-auto h-auto max-w-full max-h-full object-contain"
                          />
                          {/* <ThreeDimension name={response?.image} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 설명 */}
                <div className="m-5 rounded-[10px] overflow-hidden bg-white shadow-lg">
                  <div>
                    <div className="w-full flex items-center font-semibold p-5">
                      <div className="mr-[10px]">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">Description</span>
                    </div>
                    <div className="border-t-[1px] border-lightBg bg-[#fbfdff]">
                      <div className="p-[30px]">
                        <div className="text-[#8A939B] flex items-center">
                          <div className="w-full inline-flex items-center h-8">
                            Created by
                            <span className="ml-1 text-gold font-semibold overflow-hidden text-ellipsis">
                              {response?.name}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-ellipsis">
                            {response?.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 우 */}
              <div className="ml-[-20px]">
                <div className="mt-5 mx-5 mb-[15px]">
                  <div className="h-[46px] flex items-center">
                    <span className="text-gold font-semibold overflow-hidden text-ellipsis cursor-pointer">
                      {response?.name}
                    </span>
                  </div>
                  <span className="text-3xl font-semibold max-w-full text-textBlack">
                    {response?.name}
                  </span>
                </div>
                <div className="m-5">
                  <div className="mt-2 mb-2 mr-5 flex flex-col justify-center items-center">
                    <div className="text-[#8A939B] inline-flex items-center h-6 w-full text-[14.5px]">
                      Owned by
                      <span className="ml-1 overflow-hidden text-ellipsis text-[#2081e2] cursor-pointer">
                        {response?.nickname}
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="m-5">
                  <div className="rounded-[10px] overflow-hidden shadow-lg">
                    <div className="p-5 bg-white"></div>
                    <div className="p-5 bg-[#fbfdff]">
                      {/* 여기부터 이게 마켓플레이스에 올라가있는지 여부에 따른 차별화된 표시 */}
                      <div className="text-[#8A939B] text-[14.5px]">현재가</div>
                      <div className="mb-2 flex flex-wrap">
                        <div className="text-[30px] font-semibold flex items-center">
                          <div className="cursor-pointer">
                            <a>
                              <img
                                className="w-6 h-6 object-contain"
                                src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                                alt="ETH"
                              />
                            </a>
                          </div>
                          {/* <div className="ml-1 w-full overflow-hidden text-ellipsis">
                            {response?.price?.toFixed(2)}
                          </div> */}
                        </div>
                        {/* <div className="text-[15px] mt-[15px]">
                          <span className="text-textGray overflow-hidden text-ellipsis w-full">
                            Eth (₩ {(ethUSD * exchange).toFixed(0)}원)
                          </span>
                        </div> */}
                      </div>
                      {/* 본인 상품이냐에 따라 다른 UI */}
                      {isOwner ? (
                        <div className="flex max-w-[420px]">
                          <div className="w-full contents">
                            <div className="inline-flex w-full">
                              <button
                                onClick={() =>
                                  setSelectedRealization(response!)
                                }
                                className="inline-flex flex-row items-center rounded-[10px] justify-center font-semibold bg-lightGold hover:bg-gold px-5 py-3 border-[1px] border-lightGold text-white w-full"
                              >
                                <div className="mr-3 flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                실물화
                              </button>
                            </div>
                            <div className="inline-flex w-full lg:w-[50%] ml-2">
                              <button
                                className="inline-flex flex-row items-center rounded-[10px] justify-center font-semibold bg-white hover:bg-lightBg px-5 py-3 border-[1px] border-lightGold text-lightGold w-full"
                                onClick={() => setSelectedSell(response!)}
                              >
                                <div className="flex mr-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                판매
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex max-w-[420px]">
                          <div className="w-full contents">
                            <div className="inline-flex w-full">
                              {/* -------- 구매 버튼 ---------- */}
                              <button
                                onClick={() => setSelectedOrder(response!)}
                                className="inline-flex flex-row items-center rounded-[10px] justify-center font-semibold bg-lightGold hover:bg-gold px-5 py-3 border-[1px] border-lightGold text-white w-full"
                              >
                                <div className="mr-3 flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                Buy now
                              </button>
                            </div>
                            <div className="inline-flex w-full lg:w-[50%] ml-2">
                              <button className="inline-flex flex-row items-center rounded-[10px] justify-center font-semibold bg-white hover:bg-lightBg px-5 py-3 border-[1px] border-lightGold text-lightGold w-full">
                                <div className="flex mr-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                Make offer
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 액티비티 */}
            <div>activity</div>

            {/* 해당 유저의 다른 아이템 */}
            <div>other items</div>
          </div>
        </div>

        {/* Modal */}
        {selectedOrder && (
          <OrderModal
            ethUSD={ethUSD}
            response={response}
            onClose={cleanupModal}
            exchange={exchange}
          />
        )}
        {selectedRealization && (
          <RealizationModal
            nft={selectedRealization}
            onClose={cleanupModal}
            user={user}
            nftId={nftId}
          />
        )}
        {selectedSell && (
          <SellModal response={response} onClose={cleanupModal} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
