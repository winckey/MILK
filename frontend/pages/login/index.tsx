import Layout from "@components/ui/layout";
import useMutation from "libs/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { accessToken } from "@components/atoms/Auth";

interface ILoginForm {
  email: string;
  password: string;
}

// interface IUser {
//   age: number;
//   birthDate: string;
//   description: string;
//   email: string;
//   gender: string;
//   id: number;
//   img: boolean;
//   imgUrl: string;
//   nickname: string;
//   phone: string;
//   provider: string;
//   regDate: string;
//   userId: string;
// }

interface ILoginResponse {
  accessToken: string;
  message: string;
  statusCode: number;
  user: any;
}

export default function Login() {
  const router = useRouter();
  const setTOKEN = useSetRecoilState(accessToken);

  // request
  const [login, { loading, data, error }] =
    useMutation<ILoginResponse>("/api/user/login");

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginForm>();

  // form 제출 시 실행
  const onValid = (formData: ILoginForm) => {
    // console.log(formData);
    if (loading) return;
    login(formData);
  };
  console.log(data);

  useEffect(() => {
    if (data && data.statusCode === 200) {
      setTOKEN(data.accessToken); // 로컬 스토리지에 토큰 저장
      router.push("/"); // 메인 페이지로 이동
    }
  }, [data, router]);

  return (
    <Layout seoTitle="로그인">
      <div>
        <div className="flex items-center pt-20">
          <div className="flex flex-row justify-center items-center w-[50%] min-h-screen bg-gradient-to-r from-gold to-lightGold">
            <div className="flex flex-col justify-center text-left">
              <div className="text-4xl lg:text-5xl text-white font-bold pb-10">
                <div>최고의 명품을</div>
                <div>NFT로 만나보세요!</div>
              </div>
              <div className="text-white font-bold pb-10 lg:text-xl">
                On the Worlds Best & Largest NFT MarketPlace
              </div>
              <div className="flex justify-between">
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 1</h1>
                </div>
                <div className="w-[150px] h-[200px] lg:w-[200px] bg-blue-500">
                  <h1>박스 2</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="px-16 w-[50%]">
            <div className="text-3xl font-bold ">
              <h3>MILC에 오신 것을</h3>
              <h3>환영합니다</h3>
            </div>
            <form onSubmit={handleSubmit(onValid)} className="py-4">
              <div>
                <div>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("email", {
                        required: "이메일을 입력해 주세요.",
                      })}
                      type="email"
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="이메일"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.email?.message}
                  </span>
                  <div className="flex flex-wrap items-stretch w-full mb-2 relative h-15 bg-white rounded pr-10">
                    <div className="flex -mr-px justify-center w-15 p-4">
                      <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      {...register("password", {
                        required: "비밀번호를 입력해 주세요.",
                      })}
                      type="password"
                      className="appearance-none  my-1.5 rounded-md focus:outline-none focus:ring-gold focus:border-gold flex-shrink flex-grow leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="비밀번호"
                    />
                  </div>
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.password?.message}
                  </span>
                </div>
                <div className="my-8">
                  <button className="w-full flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white">
                    로그인
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
