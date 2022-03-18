import { Navbar } from "@components/ui/common";
import { useState } from "react";

export default function Enter() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => setMethod("email");
  const onPhoneClick = () => setMethod("phone");
  return (
    <>
      <Navbar />
      <div className="flex items-center">
        <div className="w-[50%] h-[1080px] text-center justify-items-center bg-gradient-to-r from-gold to-lightGold">
          <h1 className="text-white">hello world</h1>
        </div>
        <div className="px-4 w-[50%]">
          <div className="text-3xl font-bold">
            <h3>MILC에 오신 것을</h3>
            <h3>환영합니다</h3>
          </div>
          <div className="py-16">
            <div>
              <div>
                <input
                  type="email"
                  className="appearance-none w-full h-12 border my-1.5 border-gray-400 rounded-md"
                  placeholder="이메일"
                />
                <input
                  type="email"
                  className="appearance-none w-full h-12 border my-1.5 border-gray-400 rounded-md"
                  placeholder="비밀번호"
                />
              </div>
              <div className="my-8">
                <button
                  onClick={onEmailClick}
                  className="w-full h-10 bg-gradient-to-r from-gold to-lightGold rounded-lg text-white font-bold"
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
