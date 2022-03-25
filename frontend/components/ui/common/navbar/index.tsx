import { accessToken } from "@components/atoms/Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useRecoilValue, useRecoilState } from "recoil";
import { useLocation } from "wouter";

export const Button = (props: any) => {
  return (
    <div
      className=" btn bg-gradient-to-r font-bold text-xl from-gold to-lightGold text-white  shadow-md focus:outline-none  py-2 px-4 rounded md:ml-8 
    duration-500"
    >
      {props.children}
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const [TOKEN, setTOKEN] = useRecoilState(accessToken);
  const [open, setOpen] = useState(false);
  const logout = () => {
    localStorage.clear();
    setTOKEN("");
  };

  const AllLinks = [
    { name: "개인관", link: "/user" },
    { name: "명품관", link: "/brand" },
  ];
  const UserLinks = [
    { name: "개인관", link: "/user" },
    { name: "명품관", link: "/brand" },
    { name: "전시관", link: "/show/arts" },
    { name: "나의 정보", link: "/account" },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0  ">
      <div className="md:flex items-center justify-between h-[80px] bg-ourBlack py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center  
      text-gray-800"
        >
          <span className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold">
            <Link href={"/"}>
              <a>MILC</a>
            </Link>
          </span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer text-gold
          md:hidden"
        >
          <IoMenu />
        </div>

        <ul
          className={`md:flex md:items-center  md:pb-0 pb-8 absolute md:static bg-ourBlack md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-14 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href={"/user/index"}>
              <a className=" bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold hover:text-slate-600 duration-500">
                개인관
              </a>
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href={"/brand/index"}>
              <a className=" bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold hover:text-slate-600 duration-500">
                명품관
              </a>
            </Link>
          </li>

          <div className="flex justify-start items-center gap-3 md:gap-0">
            {TOKEN ? (
              <>
                <li className="md:ml-8 text-xl md:my-0 my-7">
                  <Link href={"/show/arts"}>
                    <a className=" bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold hover:text-slate-600 duration-500">
                      전시관
                    </a>
                  </Link>
                </li>
                <li className="md:ml-8 text-xl md:my-0 my-7">
                  <Link href="/account">
                    <a className=" bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold hover:text-slate-600 duration-500">
                      나의 정보
                    </a>
                  </Link>
                </li>
                <button
                  className=" bg-gradient-to-r font-bold text-xl from-gold to-lightGold text-white  shadow-md focus:outline-none  py-2 px-4 rounded md:ml-8 
    duration-500"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a>
                    <Button>로그인</Button>
                  </a>
                </Link>

                <Link href="/signup">
                  <a>
                    <Button>회원가입</Button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
