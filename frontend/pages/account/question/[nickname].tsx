// import { Navbar } from "@components/ui/common";

export default function Question() {
  return (
    <div>
      <div className="fixed">{/* <Navbar /> */}</div>
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
        <div className="w-[30%] pt-10 pl-8">
          <div className=" text-3xl font-bold">1:1 문의</div>
          <div className="pt-8">
            <h1 className="font-bold pb-1">문의유형</h1>

            <select
              name="문의유형"
              className="w-[100%] mb-4 rounded-md border-gray-300"
              placeholder="문의유형을 선택해주세요."
            >
              <option value="" className="text-textGray">
                문의유형을 선택해주세요.
              </option>
              <option value="">--------------------------------</option>
              <option value="">NFT거래/오류</option>
              <option value="">실물화</option>
            </select>
          </div>
          <div>
            <h1 className="font-bold pb-1">상품명</h1>
            <select
              name="문의유형"
              className="w-[100%] mb-4 rounded-md border-gray-300"
              placeholder="문의유형을 선택해주세요."
            >
              <option value="" className="text-textGray">
                문의유형을 선택해주세요.
              </option>
              <option value="">--------------------------------</option>
              <option value="">
                [CHANEL] 21FW 샤넬 클래식 램스킨 체인 플립백 NFT
              </option>
              <option value="">[GUCCI] 22SS 구찌 오리지날 스네이크 월렛</option>
            </select>
          </div>
          <div>
            <h1 className="font-bold pb-1">제목</h1>
            <input
              type="email"
              className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300 cursor-not-allowed"
              // 유저 이메일이 나타납니데잉
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div>
            <h1 className="font-bold pb-1">내용</h1>
            <textarea
              className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
              // 유저 닉네임이 나타나야 합니데잉
              placeholder="내용을 연동해주세요."
            />
          </div>
          <div className="">
            <h1 className="font-bold pb-1">파일첨부</h1>
            <div className="flex w-full items-center justify-center bg-grey-lighter">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal text-textGray">
                  Select a file
                </span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          {/* <div className="flex justify-center">
            <div className="mb-3 w-96">
              <input
                className="form-control block w-full px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFile"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
