import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BackgroundImg, ProfileImg } from "@components/cloudflare";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Layout, AccountLayout } from "@components/ui/layout";

interface IUser {
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

interface IEditProfileResponse {
  message: string;
  statusCode: number;
  user: IUser;
}

interface IEditProfileForm {
  email: string;
  userName: string;
  nickname: string;
  description: string;
  zipCode: string;
  address1: string;
  address2: string;
  phone: string;
}

const EditProfile: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<IEditProfileForm>({ mode: "onBlur" });

  // useUser로 불러온 회원 정보 useForm에 저장
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.userName) setValue("userName", user.userName);
    if (user?.nickname) setValue("nickname", user.nickname);
    if (user?.nickname) setOriginNickname(user.nickname); // 기존 닉네임 저장
    if (user?.description) setValue("description", user.description);
    if (user?.zipCode) setValue("zipCode", user.zipCode);
    if (user?.address1) setValue("address1", user.address1);
    if (user?.address2) setValue("address2", user.address2);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckNick, setStartCheckNick] = useState(false);
  const changeStartCheckNick = () => {
    setStartCheckNick(true);
    return true;
  };
  const [originNickname, setOriginNickname] = useState(""); // 기존 닉네임은 중복 확인 안되도록 저장

  // onValid form data DB에 요청
  const [editProfile, { data, loading }] = useMutation<IEditProfileResponse>(
    `/api/user`,
    "PUT"
  );

  // form 제출 시 실행
  const onValid = async (formData: IEditProfileForm) => {
    if (loading) return;

    if (window.confirm("해당 정보로 수정하시겠습니까?") == true) {
      const newData = {
        ...formData,
        email: getValues("email"),
        realName: getValues("userName"),
      };
      editProfile(newData);
    }
  };

  // server 응답 받았을 때 실행
  useEffect(() => {
    if (data && data.statusCode === 200) {
      alert("회원 정보가 수정되었습니다.");
    }
  }, [data]);

  // 주소 찾기 API
  const findAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setValue("zipCode", data.zonecode + "");
        setValue("address1", data.address);
        setValue("address2", "");
      },
    }).open();
  };

  return (
    <Layout seoTitle="프로필 수정">
      <AccountLayout>
        <div className="mt-7 mx-[52px] text-textBlack max-w-[800px] flex-1">
          <div className="flex flex-wrap justify-between mt-9">
            <h1 className="font-semibold text-[40px]">프로필 수정</h1>
            <div className="flex items-center">
              <a className="px-5 py-3 inline-flex flex-row items-center justify-center font-semibold rounded-[10px] bg-white text-textGray border hover:text-textBlack hover:shadow-lg cursor-pointer">
                <div className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Preview
              </a>
            </div>
          </div>
          {/* 아래 */}
          <div className="mt-[30px]">
            <form onSubmit={handleSubmit(onValid)} className="w-[60%]">
              <div>
                <h1 className="font-bold pb-1">닉네임</h1>
                <input
                  {...register("nickname", {
                    required: "필수 정보입니다.",
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                      message:
                        "2~10자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
                    },
                    validate: {
                      checkNickname: async (value) =>
                        originNickname === value
                          ? true
                          : (await fetch(
                              `https://j6e206.p.ssafy.io:8080/api/user/nickname/${value}`
                            )
                              .then((res) => res.json())
                              .then((result) => result))
                          ? startCheckNick
                            ? true
                            : changeStartCheckNick()
                          : "이미 사용중인 닉네임 입니다.",
                    },
                  })}
                  type="text"
                  className="w-[100%] rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="닉네임을 입력해주세요."
                />
                {startCheckNick && !errors?.nickname?.message ? (
                  <span className="text-xs text-[#05c46b]">
                    사용 가능한 닉네임 입니다.
                  </span>
                ) : (
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.nickname?.message}
                  </span>
                )}
              </div>
              <div>
                <h1 className="font-bold pb-1">자기소개</h1>
                <textarea
                  {...register("description")}
                  className="w-[100%] h-24 mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="자기소개를 입력해주세요."
                />
              </div>
              {/* <div>
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
              </div> */}
              <div>
                <h1 className="font-bold pb-1">주소</h1>
                <div className="flex items-center">
                  <input
                    {...register("zipCode")}
                    type="text"
                    className="w-[50%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                    placeholder="우편번호"
                  />
                  <div
                    onClick={findAddress}
                    className="w-20 h-8 ml-2 px-2 mb-1 text-white font-bold text-sm rounded-md bg-gradient-to-r from-gold to-lightGold cursor-pointer"
                  >
                    주소검색
                  </div>
                </div>
                <input
                  {...register("address1")}
                  type="text"
                  className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="주소"
                />
                <br />
                <input
                  {...register("address2")}
                  type="text"
                  className="w-[100%] mb-4 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                  placeholder="상세주소"
                />
                <br />
              </div>
              <div>
                <h1 className="font-bold pb-1">전화번호</h1>
                <div className="">
                  <input
                    {...register("phone", {
                      required: "필수 정보입니다.",
                      pattern: {
                        value: /^\d{3}-\d{3,4}-\d{4}$/,
                        message: "전화번호 양식을 지켜주세요.",
                      },
                    })}
                    className="w-[100%] mb-1 rounded-md text-ourBlack placeholder:text-sm placeholder:text-textGray border-solid border-gray-300"
                    placeholder="010-0000-0000"
                  />
                  <span className="text-xs text-[#ff5e57]">
                    {errors?.phone?.message}
                  </span>
                  {/* <button className="w-20 h-8 ml-2 px-2 mb-1 text-white font-bold text-sm rounded-md bg-gradient-to-r from-gold to-lightGold">
                    인증
                  </button> */}
                </div>
              </div>
              <div className="my-8">
                <button className="w-[100%] flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-lg font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white">
                  프로필 수정
                </button>
              </div>
            </form>
            <div className="w-auto hidden md:block pt-32 pl-16 text-center">
              <ProfileImg proImg={user?.proImg} userId={user?.id} />
              <BackgroundImg
                backgroundImg={user?.backgroundImg}
                userId={user?.id}
              />
            </div>
          </div>
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default EditProfile;
