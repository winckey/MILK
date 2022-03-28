import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create, CID, Options, IPFSHTTPClient } from "ipfs-http-client";
import {
  connectWallet,
  loadMarketItems,
  marketContract,
  nftContract,
  purchaseMarketItem,
} from "../../utils/interact";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import files from "@pages/api/files";

declare let window: any;

const Create: NextPage = () => {
  const router = useRouter();
  // 계정 연결
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setitems] = useState<any>([]);
  const [hidden, setHidden] = useState(true);
  const [marketplace, setMarketplace] = useState({});
  const [nft, setNFT] = useState({});

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [edition, setEdition] = useState("");
  const [type, setType] = useState(0);
  const [loyalty, setLoyalty] = useState(0);
  const [product, setProduct] = useState(false);

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

  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: { authorization },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const connectMeta = async () => {
    const wallet = await connectWallet();
    if (wallet.address) {
      setAccount(wallet.address);
    } else {
      alert("지갑을 연결해주세요");
    }
    // const provider = await detectEthereumProvider();
    // setAccountListener(provider);
    console.log(wallet);
  };

  const loadContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const res1 = await marketContract(signer);
    const res2 = await nftContract(signer);
    const items = await loadMarketItems(res1, res2);
    setitems(items);
    setMarketplace(res1);
    setNFT(res2);
    setLoading(false);
    console.log(marketplace);
  };

  const purchaseItem = async (item: Iitems) => {
    console.log(marketplace);
    const res = await purchaseMarketItem(item, marketplace);
    console.log(res);
  };

  const uploadIPFS = async (event: any) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;
    // const file = event.target.files[0];
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    const file = files[0];

    if (typeof file !== "undefined") {
      try {
        const result = await (ipfs as IPFSHTTPClient).add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await (ipfs as IPFSHTTPClient).add(
        JSON.stringify({ image, price, name, description })
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
    await (await res1.makeItem(res2.address, id, listingPrice)).wait().then(
      router.push({
        pathname: `/product/${name}`,
        query: { name, image, description, price, edition, type },
      })
    );
    console.log(res1.itemCount());
  };

  useEffect(() => {
    // connectMeta();
  }, []);
  useEffect(() => {
    // web3Handler();
    loadContracts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-lightBg  ">
      <div className="px-24 pt-32  ml-12 mr-4">
        <div>
          <div className="text-5xl mb-12 "> Create item</div>
          {/* 제품 정보들 좌+우 */}
          <button onClick={connectMeta}>지갑연결 가즈앙</button>
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-6 gap-4">
              {/* 제품명 */}
              <div>
                <div>제품명</div>
                <input
                  type="text"
                  required
                  name="name"
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
                  type="number"
                  required
                  name="name"
                  placeholder="가격을 설정해주세요."
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button onClick={createNFT}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
