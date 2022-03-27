import NFT from "../src/abis/NFT.json";
import Marketplace from "../src/abis/Marketplace.json";
import { ethers } from "ethers";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet = {
        status: "",
        address: accounts[0],
      };
      return wallet;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    alert("메타마스크를 깔아주세요~;");
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              메타마스크를 설치한 후 지갑을 연결해주세요.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const marketContract = async (signer) => {
  const contract = new ethers.Contract(
    Marketplace.networks["5777"].address,
    Marketplace.abi,
    signer
  );
  return contract;
};

export const nftContract = async (signer) => {
  const contract = new ethers.Contract(
    NFT.networks["5777"].address,
    NFT.abi,
    signer
  );
  return contract;
};

export const loadMarketItems = async (marketplace, nft) => {
  const itemCounts = await marketplace.itemCount();
  let items = [];
  for (let i = 1; i <= itemCounts; i++) {
    const item = await marketplace.items(i);
    if (!item.sold) {
      // get uri url from nft contract
      const uri = await nft.tokenURI(item.tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(item.itemId);
      // Add item to items array
      items.push({
        totalPrice,
        itemId: item.itemId,
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      });
    }
  }
  console.log(items);
  return items;
};

export const purchaseMarketItem = async (item, marketplace) => {
  await (
    await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
  ).wait();
};
