interface nftInfo {
  brand: string;
  nftName: string;
  price: string;
  imgUrl: string;
}

interface ItemProps {
  nft: nftInfo;
}

// props는 임시 데이터
export default function Item({ nft }: ItemProps) {
  // console.log(nft);
  return (
    <div>
      <div>
        <div className="h-[10px]"></div>
        <div className="flex flex-col h-full bg-white border rounded-[10px] transition hover:scale-105 cursor-pointer shadow-md hover:shadow-xl">
          <a className="flex flex-col h-full overflow-hidden rounded-[10px]">
            {/* 이미지 */}
            <div className="h-[311px] rounded-t-[10px] relative">
              <div className="w-full h-full">
                <div className="flex flex-col justify-center items-center bg-basicImage w-full h-full relative rounded-t-[10px]">
                  <div className="flex justify-center items-center h-full max-h-full max-w-full overflow-hidden relative">
                    <img
                      src={`${nft?.imgUrl}`}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 정보 */}
            <div className="w-full h-[126px] flex justify-between flex-col">
              {/* 상 */}
              <div className="flex justify-between p-3">
                <div className="mr-3 min-w-0 w-[60%]">
                  <div className="flex items-center mb-1">
                    <div className="max-w-[80%]">
                      <a className="text-xs font-semibold text-gold">
                        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis tracking-wider">
                          {nft?.brand}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden text-ellipsis">
                    <div className="text-[#353840] font-medium text-xs text-left">
                      {nft?.nftName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[40%] items-end">
                  <div className="flex items-center text-[#353840] font-semibold">
                    <div className="cursor-pointer">
                      <div className="overflow-hidden flex flex-col justify-center items-center w-[14px] h-[14px]">
                        <img
                          src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                          className="object-contain w-[14px] h-[14px]"
                        />
                      </div>
                    </div>
                    <div className="ml-[0.3em] w-full overflow-hidden whitespace-nowrap text-ellipsis text-[14px]">
                      {nft?.price}
                    </div>
                  </div>
                </div>
              </div>
              {/* 하 */}
              <div className="flex items-center justify-between font-medium p-3 h-[42px] w-full bg-transparent bg-gradient-to-b from-[#fbfdff] to-white">
                <div></div>
                <div className="flex items-center">
                  <div className="flex">
                    <button className="inline-flex items-center">
                      <svg
                        className="w-5 h-5"
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
                  <p className="font-medium text-xs text-textGray">
                    <div className="ml-[5px]">23</div>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
