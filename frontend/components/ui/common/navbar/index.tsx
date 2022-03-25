import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

export const Button = (props: any) => {
  return (
    <button
      className=" bg-gradient-to-r font-bold text-xl from-gold to-lightGold text-white  shadow-md focus:outline-none  py-2 px-4 rounded md:ml-8 
    duration-500"
    >
      {props.children}
    </button>
  );
};

export default function Navbar() {
  const logout = () => {
    localStorage.clear(); // 로컬 스토리지 초기화
  };
  let Links = [
    { name: "개인관", link: "/user" },
    { name: "명품관", link: "/" },
    { name: "랭킹", link: "/" },
  ];
  const [open, setOpen] = useState(false);
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
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link href={`${link.link}`}>
                <a className=" bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-gold to-lightGold hover:text-slate-600 duration-500">
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
          <div className="flex justify-start gap-3 md:gap-0">
            <Button>전시관</Button>
            {/* <Button>로그인</Button> */}
            <Button>로그아웃</Button>
          </div>
        </ul>
      </div>
    </div>
  );
}
