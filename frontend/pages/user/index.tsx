import type { NextPage } from "next";

const User: NextPage = () => {
  return (
    <div className="pb-20">
      <div>
        {/* 메인 사진 */}
        <div className="h-[220px] overflow-hidden bg-[#e5e8eb] shadow-2xl">
          <div className="h-[600px] w-full max-h-full max-w-full">
            <img
              src="https://lh3.googleusercontent.com/Vw6MpADIga_ZwmXOmclK87L8ax6pI_DylBcn-69kcr1Uhgw5Ij2RvXJD2MFJ0VarfIGeoFZw7NvpGLePX3e2VMztvg7XCQDNo12dLQ=h600"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
        {/* 메인 글 */}
        <div className="flex flex-col items-center mb-5">
          <span className="text-[40px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold my-7">
            Explore Luxury goods
          </span>
          <div className="text-center text-openseaGray p-5">
            <span>
              고유성에 가치를 두는 명품 패션 시장도 NFT 시장에 눈을 돌리기
              시작했습니다.
              <br />
              실물 소재와 제작 과정, 장인 정신과 브랜드 헤리티지에 따라 고가의
              가치가 매겨졌는데,
              <br /> NFT가 대상 하나하나에 고유의 객체라는 존재감을 나타낼 수
              있어서 실물 명품보다 희소성은 우위에 있다고 볼 수 있습니다.
              <br />
              MILC는 세계적인 명품 브랜드와 협업하여 NFT 뿐만 아니라 실물까지
              받을 수 있도록 제공하고 있습니다.
              <br />
              여기서 구매한 NFT를 자유롭게 거래하십시오.
            </span>
          </div>
        </div>
      </div>
      <hr />
      {/* 카드 */}
      <div>
        <p className="text-2xl font-[600] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold text-center my-10">
          Trending collections
        </p>
        <div className="px-[52px]">
          <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <div className="bg-blue-500 h-[300px]"></div>
            <div className="bg-blue-500 h-[300px]"></div>
            <div className="bg-blue-500 h-[300px]"></div>
            <div className="bg-blue-500 h-[300px]"></div>
            <div className="bg-blue-500 h-[300px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;