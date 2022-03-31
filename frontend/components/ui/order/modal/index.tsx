import { useEffect, useState } from "react";
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

interface Iresponse {
  // response: {
  //   name: string | undefined;
  //   image: string | undefined;
  //   description: string | undefined;
  //   price: number;
  //   edition: number;
  //   type: string | undefined;
  //   balance: number;
  //   nftId: string;
  // };
  onClose: Function;
}

export default function OrderModal({ onClose }: Iresponse) {
  const [isOpen, setIsOpen] = useState(true);

  // const [order, setOrder] = useState(defaultOrder);
  // const [enablePrice, setEnablePrice] = useState(false);
  // const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  // useEffect(() => {
  //   if (!!course) {
  //     setIsOpen(true);
  //     setOrder({
  //       ...defaultOrder,
  //       price: eth.perItem,
  //     });
  //   }
  // }, [course]);

  const closeModal = () => {
    setIsOpen(false);
    // setOrder(defaultOrder);
    // setEnablePrice(false);
    // setHasAgreedTOS(false);
    onClose();
  };

  // const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="">
            <div className="mt-3 sm:mt-0 sm:text-left">
              <div className="flex justify-between mx-2">
                <div>
                  {" "}
                  <h3
                    className="mb-7 text-lg font-bold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    구매하기
                  </h3>
                </div>

                <div>
                  <button
                    className="flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="mt-1 relative rounded-md flex items-center">
                <div className="">
                  <div className="mb-1">
                    {/* <img
                      src={response.image}
                      className="w-[200px] h-[200px]"
                      alt=""
                    /> */}
                  </div>
                </div>
                <div className="block pl-4">
                  {/* <div className="text-sm font-bold">
                    Edition {response.edition} of Total Edition
                  </div> */}
                  <div className="text-xs text-textGray pt-4">Product Name</div>
                  {/* <div className="text-xl">{response.name}</div> */}
                  <div className="text-xs text-textGray pt-4">Price</div>
                  <div className="flex">
                    {" "}
                    <div className="cursor-pointer">
                      <a>
                        <img
                          className="w-6 h-6 object-contain"
                          src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                          alt="ETH"
                        />
                      </a>
                    </div>
                    {/* <div>{response.price.toFixed(1)} (₩ 이더가격)</div> */}
                  </div>
                </div>
              </div>
              {/* {isNewPurchase && (
                <> */}
              {/* <div>{response.balance}</div> */}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button
            className="w-full flex justify-center items-center my-4 py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
            // disabled={formState.isDisabled}
            // onClick={() => {
            //   onSubmit(order, course);
            // }}
          >
            Buy
          </button>
        </div>
      </div>
    </Modal>
  );
}
