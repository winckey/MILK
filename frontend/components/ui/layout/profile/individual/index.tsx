// 개인 프로필 Layout

import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

interface User {
  address1: string;
  address2: string;
  backgroundImg: string;
  description: string;
  email: string;
  id: number;
  nickname: string;
  phone: string;
  proImg: string;
  userName: string;
  zipCode: string;
}

interface UserProfileResponse {
  message: string;

  // success
  statusCode?: number;
  user?: User;

  // error
  code?: string;
  error?: string;
  requestUrl?: string;
  status?: number;
}

interface LayoutProps {
  children: React.ReactNode;
}

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

// 해당 링크에 있을 때 style
const ActiveLink = ({ children, href }: LinkProps) => {
  const router = useRouter();

  // pathname slug 변환
  const slug = router.pathname.replace(
    "[nickname]",
    `${router.query.nickname}`
  );

  return (
    <Link href={href} scroll={false}>
      <a
        className={`${
          slug === href
            ? "text-[#353840] border-b-4 border-lightGold"
            : "text-textGray"
        } px-[30px] py-5 w-full flex cursor-pointer hover:text-[#353840]`}
      >
        {children}
      </a>
    </Link>
  );
};

export default function IndividualProfileLayout({ children }: LayoutProps) {
  const router = useRouter();

  // 해당 nickname을 가진 유저 정보 가져오기
  const { data } = useSWR<UserProfileResponse>(
    router.query.nickname
      ? `https://j6e206.p.ssafy.io:8080/api/user/info/${router.query.nickname}`
      : null
  );

  // 존재하지 않는 회원 url 직접 입력 방지
  useEffect(() => {
    if (data && data?.status === 404) {
      alert("존재하지 않는 회원입니다.");
      router.replace("/"); // 메인 페이지로 이동
    }
  }, [data, router]);

  return (
    <div className="pb-20">
      {/* 프로필 */}
      <div>
        <div className="relative z-0">
          <div className="h-[225px] overflow-hidden bg-basicImage shadow-lg">
            <div className="h-[600px] w-full max-h-full max-w-full">
              {data?.user?.backgroundImg ? (
                <img
                  src={`https://imagedelivery.net/VMYwPRIpsXwlX0kB6AjPIA/${data?.user?.backgroundImg}/public`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-5">
          <div className="relative -mt-16">
            <div className="inline-flex items-center">
              <div className="h-[130px] w-[130px] bg-basicImage border-2 border-lightBg flex justify-center items-center max-w-full max-h-full overflow-hidden relative rounded-full cursor-pointer shadow-md">
                {data?.user?.proImg ? (
                  <img
                    src={`https://imagedelivery.net/VMYwPRIpsXwlX0kB6AjPIA/${data?.user?.proImg}/avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[40px] text-textBlack text-center px-4 mt-1">
              {data?.user?.nickname}
            </p>
          </div>
          {/* <div className="mt-4">
            <div className="flex flex-wrap border-[1px] rounded-[10px] items-center">
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div className="border-r-[1px]">
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
              <div>
                <a>
                  <div className="w-[144px] h-[88px] flex flex-col justify-center items-center py-[10px]">
                    <div className="flex justify-center items-center w-full">
                      <span className="font-semibold text-2xl">324</span>
                    </div>
                    <div className="mt-2 text-sm text-[#8A939B]">items</div>
                  </div>
                </a>
              </div>
            </div>
          </div> */}
          <div className="break-words p-5 text-textGray text-center max-w-[800px]">
            <span>{data?.user?.description}</span>
          </div>
        </div>

        {/* tab */}
        <div className="flex justify-center">
          <ul className="flex">
            <li>
              <ActiveLink href={`/profile/${data?.user?.nickname}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className="ml-4 mr-3 font-semibold">판매 목록</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href={`/profile/${data?.user?.nickname}/collection`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span className="ml-4 mr-3 font-semibold">보유 목록</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href={`/profile/${data?.user?.nickname}/favorite`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="ml-4 mr-3 font-semibold">관심 목록</span>
              </ActiveLink>
            </li>
          </ul>
        </div>
      </div>
      {/* 카드 */}
      {children}
    </div>
  );
}
