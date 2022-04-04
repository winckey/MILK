import NFT from "../src/abis/NFT.json";
import Marketplace from "../src/abis/Marketplace.json";
import { ethers } from "ethers";
import Web3 from "web3";

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

export const loadMarketItems = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const marketplace = await marketContract(signer);
  const nft = await nftContract(signer);
  const itemCounts = await marketplace.itemCount();
  // const item2 = await marketplace.items(0);
  // console.log(item2);
  console.log(itemCounts);
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
      // console.log("이 NFT의 ID 값은", item.itemId);
      // console.log("이 NFT의 주인은", item.seller);
      // console.log("이 상품의 이미지 주소는", item.image);
      console.log(item);
    }
  }
  console.log(items);
  // console.log(
  //   items[itemCounts - 1].seller,
  //   items[itemCounts - 1].itemId,
  //   typeof items[itemCounts - 1].itemId
  // );
  return items;
  // {
  //   items: items,
  //   seller: items[itemCounts - 1].seller,
  //   id: items[itemCounts - 1].itemId,
  // };
};

export const purchaseMarketItem = async (item, marketplace) => {
  await (
    await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
  ).wait();
};

export const getUserBalance = async () => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const wallet = await connectWallet();
    const balance = await web3.eth.getBalance(wallet.address);
    const balanceEth = ethers.utils.formatEther(balance);
    return balanceEth;
  }
};
