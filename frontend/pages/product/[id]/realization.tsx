import { NextPage } from "next";
import Layout from "@components/ui/layout";
import useUser from "@libs/client/useUser";

const Realization: NextPage = () => {
  // const { user, isLoading } = useUser();
  // console.log(user);

  // product id로 nft 정보 받아온 결과
  const response = {
    name: "Gucci bag",
  };

  return (
    <Layout seoTitle="실물화">
      <div className="h-[220px] overflow-hidden bg-basicImage shadow-md">
        <div className="h-[600px] w-full max-h-full max-w-full">
          <img
            src="https://lh3.googleusercontent.com/Vw6MpADIga_ZwmXOmclK87L8ax6pI_DylBcn-69kcr1Uhgw5Ij2RvXJD2MFJ0VarfIGeoFZw7NvpGLePX3e2VMztvg7XCQDNo12dLQ=h600"
            alt="#"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="max-w-[850px] w-[90%] mx-auto">
        <div className="mb-[70px] bg-lightGold py-3 px-5 rounded text-center shadow-md">
          <span className="text-white font-semibold text-xl">실물화</span>
        </div>
        <div className="mb-[70px] rounded-[10px]">
          <div className="bg-white px-4 py-5 font-semibold">상품명 : dd</div>
          <div className="bg-[#fbfdff] px-4 py-5 border-t border-lightBg">
            {response.name}
          </div>
        </div>
      </div>

      {/* <div>
        <div className="flex pt-20">
          <div className="w-[85%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] pt-10 pl-8">
            <div className=" text-3xl font-bold">실물화</div>
            <div className="pt-8">
              <h1 className="font-bold pb-1">상품명</h1>

              <select
                name="문의유형"
                className="w-[100%] mb-4 rounded-md border-gray-300"
                placeholder="문의유형을 선택해주세요."
              >
                <option value="" className="text-textGray">
                  상품을 선택해주세요.
                </option>
                <option value="">--------------------------------</option>
                <option value="">
                  [CHANEL] 21FW 샤넬 클래식 램스킨 체인 플립백 NFT
                </option>
                <option value="">
                  [GUCCI] 22SS 구찌 오리지날 스네이크 월렛
                </option>
              </select>
            </div>
            <div>
              <h1 className="font-bold pb-1">이름</h1>
              <input
                type="text"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300 cursor-not-allowed"
                // 유저 이메일이 나타납니데잉
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div>
              <h1 className="font-bold pb-1">주소</h1>
              <input
                type="text"
                className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="우편번호"
              />
              <br />
              <input
                type="text"
                className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="주소"
              />
              <br />
              <input
                type="text"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="상세주소"
              />
              <br />
            </div>
            <div>
              <h1 className="font-bold pb-1">휴대폰</h1>
              <input
                type="number"
                className="w-[100%] mb-8 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                // 유저 닉네임이 나타나야 합니데잉
                placeholder="010-0000-0000"
              />
            </div>
            <div className="flex justify-between pb-4 mx-2">
              <div>
                <div className="font-bold">
                  실물화를 신청하고 승인이 완료되면 해당 NFT의 거래가
                  정지됩니다.
                </div>
                <div className="text-textGray text-sm">
                  상품을 반납하고 해당 실물 제품에 대한 검수가 완료되면 다시
                  NFT를 거래할 수 있게 됩니다.
                </div>
              </div>
              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
            <div className="flex justify-between pb-4 mx-2">
              <div>
                <div className="font-bold">
                  상품 배송기간은 브랜드 및 상품별로 상이하며, 예정 시일보다
                  길어질 수 있습니다.
                </div>
                <div className="text-textGray text-sm">
                  평균적으로 실물 상품을 받아보는데 2주 ~ 1개월 정도 소요되며,
                  브랜드별로 이 기간이 길어질 수 있습니다.
                </div>
              </div>
              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
            <div className="flex justify-between pb-4 mx-2">
              <div>
                <div className="font-bold">
                  실물화를 신청하고 승인이 완료되면 실물화 취소가 불가능합니다.
                </div>
                <div className="text-textGray text-sm">
                  실물화 승인이 완료되면, 해당 브랜드에서 상품 제작을 시작하므로
                  실물화 취소가 불가능합니다.
                </div>
              </div>
              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
            <div className="flex justify-between pb-4 mx-2">
              <div>
                <div className="font-bold">
                  실물화 조건을 모두 확인하였으며, 실물화 진행에 동의합니다.
                </div>
              </div>
              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
            <div className="my-8">
              <button
                // onClick={}
                className="w-[100%] flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-lg font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
              >
                실물화 신청
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Realization;
