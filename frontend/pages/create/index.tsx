import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create, CID, Options, IPFSHTTPClient } from "ipfs-http-client";
import {
  connectWallet,
  getUserBalance,
  loadMarketItems,
  marketContract,
  nftContract,
  purchaseMarketItem,
} from "../../utils/interact";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import files from "@pages/api/files";
import Web3 from "web3";
import useMutation from "@libs/client/useMutation";
import { useForm } from "react-hook-form";
import { truncate } from "fs";
import { SellModal } from "@components/ui/sell";

declare let window: any;

interface Iitems {
  totalPrice: any;
  itemId: any;
  seller: any;
  name: any;
  description: any;
  image: any;
}

interface INftForm {
  nftId: string;
  nftName: string;
  price: string;
  imgUrl: string;
  product: boolean;
  description: string;
  edition: number;
  type: number;
  loyalty: number;
}

interface INftResponse {
  message: string;
  statusCode: number;
}

const Create: NextPage = () => {
  const router = useRouter();
  // 계정 연결
  const [account, setAccount] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [items, setitems] = useState<any>([]);
  const [hidden, setHidden] = useState(true);
  const [marketplace, setMarketplace] = useState({});
  const [time, setTime] = useState(false);
  const [nft, setNFT] = useState({});
  // const [id, setId] = useState("");
  const [image, setImage] = useState<string | undefined>("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [edition, setEdition] = useState(0);
  const [type, setType] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const [product, setProduct] = useState(false);
  const [nftId, setNftId] = useState("");

  // const setAccountListener = (provider: any) => {
  // provider.on("accountsChanged", (_) => window.location.reload());
  // setLoading(false);
  // };

  const [uploadNFT, { loading, data, error }] =
    useMutation<INftResponse>("/nft");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<INftForm>({ mode: "onBlur" });

  const onValid = (formData: INftForm) => {
    // console.log(formData);
    console.log(nftId);
    if (loading) return;

    console.error("하이~");
    console.log(formData);
    // console.log(newFormData);
    if (window.confirm("해당 상품을 NFT로 등록하시겠습니까?") === true) {
      uploadNFT(formData);
    }
  };

  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      // headers: { authorization },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const connectMeta = async () => {
    if (typeof window.ethereum !== "undefined") {
      const wallet = await connectWallet();
      if (wallet.address) {
        setAccount(wallet.address);
      } else {
        alert("지갑을 연결해주세요");
      }
      // const provider = await detectEthereumProvider();
      // setAccountListener(provider);
      console.log(wallet);
    }
  };

  // const loadContracts = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const res1 = await marketContract(signer);
  //   const res2 = await nftContract(signer);
  //   const items = await loadMarketItems(res1, res2);
  //   setitems(items);
  //   setMarketplace(res1);
  //   setNFT(res2);
  //   setLoading(false);
  //   setId(items.id);
  //   console.log(id);
  //   console.log(marketplace);
  // };

  const purchaseItem = async (item: Iitems) => {
    console.log(marketplace);
    const res = await purchaseMarketItem(item, marketplace);
    console.log(res);
  };

  const uploadIPFS = async (event: any) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target[0]);
    const form = event.target as HTMLFormElement;
    console.log(form);
    const file = form.files[0];
    console.log(files);
    // const file = event.target.files[0];
    // if (!files || files.length === 0) {
    //   return alert("No files selected");
    // }
    // const file = files[0];
    console.log(file);

    if (typeof file !== "undefined") {
      try {
        const result = await (ipfs as IPFSHTTPClient).add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
    console.log(typeof image);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };
  const createNFT = async (event: any) => {
    event.preventDefault();
    if (!image || !price || !name || !description) return;
    try {
      // let result = [];
      // for (let index = 1; index <= Number(edition); index++) {
      //   const tmp = await (ipfs as IPFSHTTPClient).add(
      //     JSON.stringify({ image, name, description, index })
      //   );
      //   console.log(index);
      //   // await timeout(1000);
      //   console.log(result);
      //   result.push(tmp);
      // }
      // console.log(result);
      const result = await (ipfs as IPFSHTTPClient).add(
        JSON.stringify({ image, name, description })
      );
      console.log(result);
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result: any) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const jsonRpcProvider = new ethers.providers.JsonRpcProvider();
    const res1 = await marketContract(signer);
    const res2 = await nftContract(signer);

    await res2.mint(uri);
    // get tokenId of new nft
    const id = await res2.tokenCount();
    // approve marketplace to spend nft
    await (await res2.setApprovalForAll(res1.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    console.log(id);
    console.log(parseInt(id, 16));
    const itemId = parseInt(id, 16).toString();
    console.log(itemId);
    const itemId2 = itemId.toString();
    console.log(itemId2);
    setNftId(itemId2);
    const test = { imgUrl: image, nftId: itemId2, nftName: name, price: price };
    const newFormData = Object.assign(test);
    console.log(newFormData);
    const balance = await getUserBalance();
    await (
      await res1.makeItem(res2.address, id, listingPrice)
    )
      .wait()
      .then(handleSubmit(() => onValid(newFormData)))
      .then(
        router.push({
          pathname: `/product/${itemId2}`,
          query: {
            name,
            image,
            description,
            price,
            edition,
            type,
            itemId2,
            balance,
          },
        })
      );
    console.log(res1.itemCount());
  };

  const onClick = async () => {
    const res = await loadMarketItems();
    console.log(res);
  };

  // useEffect(() => {
  //   if (data && data.statusCode === 200) {
  //     alert("NFT 상품이 등록되었습니다!");
  //     router.push({
  //       pathname: `/product/${nftId}`,
  //       query: { name, image, description, price, edition, type, nftId },
  //     });
  //   }
  // }, [data, router]);
  // useEffect(() => {
  //   // web3Handler();
  //   loadContracts();
  // }, []);
  console.log(product);
  const inputClass =
    "bg-white rounded-[10px] border max-w-[600px] p-3 cursor-text focus-within:shadow-md focus-within:border-lightGold focus-within:ring-1 focus-within:ring-lightGold";
  const [selectedSell, setSelectedSell] = useState<null | object>(null);
  const response = {
    image:
      "https://img.koreatimes.co.kr/upload/newsV2/images/202110/ded3f223c33744129183ed11be80ea57.jpg/dims/resize/740/optimize",
    name: "Chanel Classic flap bag",
    description: "걍 개지림;",
    edition: 11,
    production: true,
  };
  const cleanupModal = () => {
    setSelectedSell(null);
  };
  return (
    <div className="min-h-screen w-full bg-lightBg  ">
      {selectedSell && <SellModal response={response} onClose={cleanupModal} />}
      <div className="flex justify-evenly">
        <button onClick={() => setSelectedSell(response)}>
          판매모달띄우기
        </button>
        <button onClick={onClick}>리스트</button>
        <button onClick={connectMeta}>지갑연결 가즈앙</button>
      </div>
      <div className="px-12 ml-12 mr-4 flex justify-center">
        <div className="w-[50]% ">
          <div className="text-3xl font-bold mb-8 "> Create New Item</div>
          <div className="text-xs text-textGray mb-2">
            <span className="text-red-500 font-bold">*</span> 필수 입력항목
          </div>
          {/* 제품 정보들 좌+우 */}
          <form onSubmit={createNFT}>
            <div className="">
              <div className="">
                <div>
                  <div className="font-bold">
                    Image, Video, Audio, or 3D Model
                    <span className="pl-1 text-red-500">*</span>
                  </div>
                  <div className="text-xs text-textGray pb-2 font-medium">
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                    WAV, OGG, GLB, GLTF. Max size: 100 MB
                  </div>
                  <label className="lg:w-[100%] lg:h-[300px] w-[300px] h-[200px] flex flex-col items-center justify-center px-4 py-6 bg-white text-gold rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gold hover:text-white">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    {ipfs && (
                      <>
                        <div>
                          <div className="">
                            <input
                              className="hidden"
                              type="file"
                              required
                              name="file"
                              onChange={uploadIPFS}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </label>
                </div>
                {/* 제품명 */}
                <div className="pt-6 pb-2 pl-2 font-bold">
                  제품명<span className="pl-1  text-red-500">*</span>
                </div>
                <div className={inputClass}>
                  <input
                    {...register("nftName", {
                      required: "필수 입력정보입니다.",
                    })}
                    className="w-full outline-none placeholder:text-sm placeholder:text-textGray"
                    placeholder="제품명을 입력해주세요."
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="pl-3">
                  {errors?.nftName?.message ? (
                    <p className="mt-[3px] text-xs text-[#ff5e57]">
                      {errors?.nftName?.message}
                    </p>
                  ) : null}
                </div>
                {/* 제품 설명 */}
                <div>
                  <div className="pt-6 pb-2 pl-2 font-bold">상세 설명</div>{" "}
                  <div className={inputClass}>
                    <input
                      {...register("description", {
                        onChange: (e) => setDescription(e.target.value),
                      })}
                      className="w-full outline-none placeholder:text-sm placeholder:text-textGray"
                      placeholder="제품 상세설명을 입력해주세요."
                    />{" "}
                  </div>
                </div>
                {/* 에디션 */}
                <div>
                  <div className="pt-6 pb-2 pl-2 font-bold">
                    Edition<span className="pl-1  text-red-500">*</span>
                  </div>
                  <div className={inputClass}>
                    <input
                      {...register("edition", {
                        required: "필수 입력정보입니다.",
                        pattern: {
                          value: /^[1-9]+$/,
                          message: "숫자만 입력하세요",
                        },
                        onChange: (e) => setEdition(Number(e.target.value)),
                      })}
                      className="w-full outline-none placeholder:text-sm placeholder:text-textGray"
                      placeholder="에디션 넘버를 지정해주세요."
                    />{" "}
                  </div>

                  <div className="pl-3">
                    {errors?.edition?.message ? (
                      <p className="mt-[3px] text-xs text-[#ff5e57]">
                        {errors?.edition?.message}
                      </p>
                    ) : null}
                  </div>
                </div>
                {/* 제품실물여부 */}
                <div>
                  <div className="pt-6 pb-2 pl-2 font-bold">
                    실물화 여부<span className="pl-1  text-red-500">*</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        product ? null : setProduct(true);
                      }}
                      className="flex justify-center items-center w-[150px] h-[50px] rounded-lg border-2 border-gold font-bold hover:bg-gold hover:text-white hover:cursor-pointer active:bg-gold focus:text-white focus:bg-gold"
                    >
                      가능
                    </button>
                    <button
                      type="button"
                      onClick={() => (product ? setProduct(false) : null)}
                      className="flex justify-center items-center w-[150px] h-[50px] rounded-lg border-2 border-gold font-bold hover:bg-gold hover:text-white hover:cursor-pointer focus:text-white focus:bg-gold"
                    >
                      불가능
                    </button>
                  </div>
                </div>
                <button
                  onClick={createNFT}
                  className="my-16 py-3 font-semibold px-8 rounded-[10px] bg-lightGold border border-lightGold text-white hover:bg-gold hover:shadow-md focus:bg-gold focus:outline-none"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
