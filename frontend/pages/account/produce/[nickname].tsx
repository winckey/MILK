import { Navbar } from "@components/ui/common";

export default function Produce() {
  return (
    <div>
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex pt-20">
        <div className="w-[25%] hidden lg:block">
          <div className="py-8 pl-16 text-2xl font-bold">계정 설정</div>
          <div className="flex flex-col">
            <div className="pl-16">
              <div className="flex w-[70%] p-2 rounded-md text-textGray focus:text-white focus:bg-gradient-to-r from-gold to-lightGold">
                <div className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <button className="font-bold">프로필</button>
                </div>
              </div>
            </div>
            <div className="pl-16">
              <div className="flex w-[70%] p-2 rounded-md text-textGray focus:text-white focus:bg-gradient-to-r from-gold to-lightGold">
                <div className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <button className="font-bold">알림</button>
                </div>
              </div>
            </div>
            <div className="pl-16 ">
              <div className="flex w-[70%] p-2 text-white bg-gradient-to-r from-gold to-lightGold rounded-md">
                <div className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <button className="font-bold">1:1 문의</button>
                </div>
              </div>
            </div>
            <div className="pl-16">
              <div className="flex w-[70%] p-2 rounded-md text-textGray">
                <div className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <button className="font-bold">실물화</button>
                </div>
              </div>
            </div>
            <div className="pl-16 ">
              <div className="flex w-[70%] p-2 rounded-md text-textGray">
                <div className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <button className="font-bold">수익</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <option value="">[GUCCI] 22SS 구찌 오리지날 스네이크 월렛</option>
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
                실물화를 신청하고 승인이 완료되면 해당 NFT의 거래가 정지됩니다.
              </div>
              <div className="text-textGray text-sm">
                상품을 반납하고 해당 실물 제품에 대한 검수가 완료되면 다시 NFT를
                거래할 수 있게 됩니다.
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
    </div>
  );
}
