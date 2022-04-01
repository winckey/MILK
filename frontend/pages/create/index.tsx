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

declare let window: any;

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
  const [edition, setEdition] = useState("");
  const [type, setType] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const [product, setProduct] = useState(false);
  const [nftId, setNftId] = useState("");

  // const setAccountListener = (provider: any) => {
  // provider.on("accountsChanged", (_) => window.location.reload());
  // setLoading(false);
  // };

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
  }

  interface INftResponse {
    message: string;
    statusCode: number;
  }

  const [uploadNFT, { loading, data, error }] =
    useMutation<INftResponse>("/Mlik/nft");

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
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result: any) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;

    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let account = accounts[0];
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

  return (
    <div className="min-h-screen w-full bg-lightBg  ">
      <div className="px-24 pt-32  ml-12 mr-4">
        <div>
          <div className="text-5xl mb-12 "> Create item</div>
          {/* 제품 정보들 좌+우 */}
          <button onClick={connectMeta}>지갑연결 가즈앙</button>
          <form onSubmit={createNFT}>
            <div className="grid grid-cols-2">
              <div className="grid grid-rows-6 gap-4">
                {/* 제품명 */}
                <div>
                  <div>제품명</div>
                  <input
                    {...register("nftName", {
                      required: "필수 입력정보입니다.",
                    })}
                    placeholder="제품명을 입력해주세요."
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* 제품실물여부 */}
                <div>
                  <div>실물 여부</div>
                  <input
                    type="checkbox"
                    required
                    name="name"
                    onChange={(e) => setProduct(e.target.checked)}
                  />
                </div>
                {/* 제품 설명 */}
                <div>
                  <div>상세 설명</div>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="제품 상세설명을 입력해주세요."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/* 에디션 */}
                <div>
                  <div>Edition</div>
                  <input
                    type="number"
                    required
                    name="name"
                    placeholder="에디션 넘버를 지정해주세요."
                    onChange={(e) => setEdition(e.target.value)}
                  />
                </div>
                {/* 판매유형 */}
                <div>
                  <div>판매 유형</div>
                  <input type="text" />
                </div>
                {/* 로열티 */}
                <div>
                  <div>로열티 설정</div>
                  <input type="number" />
                </div>
              </div>
              <div className="grid gap-5 ">
                {ipfs && (
                  <>
                    <div>
                      <div>제품 파일 올리기</div>
                      <div className="bg-lightGold h-[250px] w-[250px]">
                        <input
                          type="file"
                          required
                          name="file"
                          onChange={uploadIPFS}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <div>가격</div>
                  <input
                    {...register("price", {
                      required: "필수 입력정보입니다.",
                    })}
                    name="price"
                    placeholder="가격을 설정해주세요."
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <button>Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
