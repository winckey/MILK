import Layout from "@components/ui/layout";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface IUserResponse {
  message: string;
  statusCode: number;
  user: any;
}

interface IEditProfileForm {
  nickname: string;
  description: string;
  phone: string;
  profile_img: string;
  backgroundfile_img: string;
  zipCode: string;
}

export default function EditProfile() {
  // 유저 정보 받아옴
  const { data, mutate } = useSWR<IUserResponse>(
    `http://j6e206.p.ssafy.io:8080/api/user/info`
  );

  console.log(data);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IEditProfileForm>();

  console.log(watch());

  return (
    <Layout seoTitle="회원 정보 수정">
      <div>
        <div className="flex pt-20">
          <div className="w-[25%] hidden lg:block">
            <div className="py-8 pl-16 text-2xl font-bold">계정 설정</div>
            <div className="flex flex-col">
              <div className="pl-16">
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
            <div className=" text-3xl font-bold">프로필</div>
            <div className="pt-8">
              <h1 className="font-bold pb-1">닉네임</h1>
              <input
                {...register("nickname")}
                type="text"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                // 유저 닉네임이 나타나야 합니데잉
                placeholder="닉네임을 입력해주세요."
              />
            </div>
            <div>
              <h1 className="font-bold pb-1">자기소개</h1>
              <textarea
                {...register("description")}
                className="w-[100%] h-24 mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="자기소개를 입력해주세요."
              />
            </div>
            <div>
              <h1 className="font-bold pb-1">이메일</h1>
              <input
                type="email"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300 cursor-not-allowed"
                // 유저 이메일이 나타납니데잉
                placeholder="이메일을 입력해주세요."
              />
            </div>
            <div>
              <h1 className="font-bold pb-1">지갑주소</h1>
              <input
                type="text"
                className="w-[100%] rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                // 유저 닉네임이 나타나야 합니데잉
                placeholder="지갑을 연동해주세요."
              />
              <button className="mb-4 rounded-md text-sm text-white font-bold px-2 py-1 mt-1 bg-gradient-to-r from-gold to-lightGold">
                지갑연결
              </button>
            </div>
            {/* <div className="">
              <h1 className="font-bold pb-1">링크</h1>
              <input
                type="text"
                className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="Instagram"
              />
              <br />
              <input
                type="text"
                className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="Twitter"
              />
              <br />
              <input
                type="text"
                className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="Website"
              />
              <br />
              <input
                type="text"
                className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                placeholder="Youtube Channel"
              />
              <br />
            </div> */}
            <div>
              <h1 className="font-bold pb-1">주소</h1>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-[50%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="우편번호"
                />
                <button className="w-20 h-8 ml-2 px-2 mb-1 text-white font-bold text-sm rounded-md bg-gradient-to-r from-gold to-lightGold">
                  주소검색
                </button>
              </div>
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
              <h1 className="font-bold pb-1">전화번호</h1>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-[50%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="010-0000-0000"
                />
                <button className="w-20 h-8 ml-2 px-2 mb-1 text-white font-bold text-sm rounded-md bg-gradient-to-r from-gold to-lightGold">
                  인증
                </button>
              </div>
            </div>

            <div className="my-8">
              <button
                // onClick={}
                className="w-[100%] flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-lg font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
              >
                프로필 수정
              </button>
            </div>
          </div>
          <div className="w-auto hidden md:block pt-32 pl-16 text-center">
            <div className="flex items-center justify-center pb-2 font-bold">
              프로필 사진
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="h-32 w-32 mb-8 bg-gold rounded-full"></div>
            <div className="flex items-center justify-center pb-2 font-bold">
              프로필 배너
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="h-32 w-32 bg-gold rounded-full"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
