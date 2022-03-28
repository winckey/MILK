import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../common";

// const defaultOrder = {
//   price: "",
//   email: "",
//   confirmationEmail: "",
// };

// const _createFormState = (isDisabled = false, message = "") => ({
//   isDisabled,
//   message,
// });

// const createFormState = (
//   { price, email, confirmationEmail },
//   hasAgreedTOS,
//   isNewPurchase
// ) => {
//   if (!price || Number(price) <= 0) {
//     return _createFormState(true, "Price is not valid.");
//   }

//   if (isNewPurchase) {
//     if (confirmationEmail.length === 0 || email.length === 0) {
//       return _createFormState(true);
//     } else if (email !== confirmationEmail) {
//       return _createFormState(true, "Email are not matching.");
//     }
//   }

//   if (!hasAgreedTOS) {
//     return _createFormState(
//       true,
//       "You need to agree with terms of service in order to submit the form"
//     );
//   }

//   return _createFormState();
// };

interface RealizationModalProps {
  onClose: Function;
}

interface IRealizationForm {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
}

export default function RealizationModal({ onClose }: RealizationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // input 값 받아옴
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IRealizationForm>();

  // data 초기화
  useEffect(() => {
    // if (!!course) {
    setIsOpen(true);
    // }
    setValue("check1", false);
    setValue("check2", false);
    setValue("check3", false);
    setValue("check4", false);
  }, []);

  // form 제출 시 실행
  const onValid = (formData: IRealizationForm) => {
    console.log(formData);
  };

  // 취소 버튼
  const closeModal = () => {
    setIsOpen(false);
    // setOrder(defaultOrder);
    // setEnablePrice(false);
    // setHasAgreedTOS(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-lightBg rounded-lg text-textBlack text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-3 sm:mt-0 sm:text-left"
              id="form"
            >
              <h3 className="mb-7 font-semibold text-xl">실물화 신청</h3>

              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">상품명</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  response.name
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">이름</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  user.userName
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">이메일</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  user.email
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">휴대전화</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  user.phone
                </div>
              </div>
              <div className="relative rounded-md bg-white py-1 mb-3 shadow-sm">
                <div className="font-semibold px-4">주소</div>
                <div className="bg-[#fbfdff] border-t border-lightBg px-4">
                  <div>user.zipCode</div>
                  <div>user.address1</div>
                  <div>user.address2</div>
                </div>
              </div>

              <div className="text-xs my-5 space-y-2">
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check1", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 신청 후 승인이 완료되면 해당 NFT의 거래가
                    &apos;정지&apos; 됩니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check2", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 신청 후 승인이 완료되면 실물화 취소가
                    &apos;불가능&apos; 합니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check3", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    상품 배송기간은 브랜드 및 상품별로 상이하며, 예정 시일보다
                    길어질 수 있습니다.
                  </div>
                </div>
                <div className="flex px-2">
                  <label className="flex items-center mr-2">
                    <input
                      {...register("check4", {
                        required: "error",
                      })}
                      type="checkbox"
                    />
                  </label>
                  <div className="text-textGray">
                    실물화 조건을 모두 확인하였으며, 실물화 진행에 동의합니다.
                  </div>
                </div>
              </div>

              {(errors.check1 ||
                errors.check2 ||
                errors.check3 ||
                errors.check4) && (
                <div className="px-4 mb-5 text-red-500 rounded-lg text-sm">
                  실물화 이용약관에 대한 안내 모두 동의해주세요.
                </div>
              )}

              <div className="flex">
                <button
                  className="rounded-[10px] font-semibold bg-lightGold hover:bg-gold px-5 py-3 border-[1px] border-lightGold text-white w-full mr-2"
                  form="form"
                  // onClick={() => {
                  //   onSubmit(order, course);
                  // }}
                >
                  신청
                </button>
                <button
                  onClick={closeModal}
                  className="rounded-[10px] font-semibold bg-red-300 hover:bg-red-600 px-5 py-3 text-white w-[100px]"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
