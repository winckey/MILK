import { Layout } from "@components/ui/layout";
import Message from "@components/ui/message";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient: any = null;

const Stream: NextPage = () => {
  const { user, isLoading } = useUser();
  const [chats, setChats]: any = useState([]);
  const [highMoney, setHighMoney]: any = useState([]);
  const [highest, setHighest] = useState(0);
  const [userData, setUserData] = useState({
    nickName: "",
    receivername: "",
    connected: false,
    message: "",
    // 내 지갑에서 받아와야함
    myAsset: 0,
    // 응찰가
    money: 0,
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS(`https://j6e206.p.ssafy.io:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = () => {
    console.log("error가 무엇이냐");
  };

  const onConnected = () => {
    setUserData({
      ...userData,

      nickName: user.nickname,

      connected: true,

      // roomId: roomId,
    });

    // 그 방에 대한 정보 subscribe 할 수 있도록
    // stompClient.subscribe(`/subscribe/chat/room/${router.query.id:룸아이디}`, onMessageRecived);
    stompClient.subscribe(`/subscribe/chat/room/1`, onMessageRecived);
  };
  const onMessageRecived = (response: any) => {
    const res = JSON.parse(response.body);
    console.log("응답은", res);
    if (res) {
      console.log(res);
    } else {
      console.log("error");
    }

    switch (res.status) {
      case "MESSAGE":
        chats.push(res);
        setChats([...chats]);
        break;
      case "AUCTION":
        let don = res.cost;
        setHighest(don);
        console.log(don, "이다!");
        highMoney.push(res);
        setHighMoney([...highMoney]);
        console.log("최고가 갱신!", highMoney);

        break;
    }
  };

  const handleMoney = (e: any) => {
    const { value } = e.target;
    setUserData({ ...userData, money: value });
  };
  const handleMessage = (event: any) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.nickName,
        message: userData.message,
        status: "MESSAGE",
        roomId: 1,
      };
      stompClient.send(
        "/publish/chat/message",
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrice = () => {
    if (stompClient && userData.money <= highest) {
      console.log("돈 더 업");
    } else if (stompClient) {
      const priceList = {
        senderName: userData.nickName,
        cost: userData.money,
        roomId: 1,
        status: "AUCTION",
      };
      console.log("돈보낸디", priceList);
      stompClient.send("/publish/chat/auction", {}, JSON.stringify(priceList));
      // 응찰가격 0으로 리셋
      setUserData({ ...userData, money: 0 });
      // } else if (stompClient && userData.money <= highMoney) {
      //   console.log("더 높은 금액을 입력하세요");
      // }
    }
  };

  const registerUser = () => {
    connect();
  };
  return (
    // navbar 뒤로가기만 생성
    <Layout seoTitle="라이브 경매">
      <div className="flex justify-center flex-col md:flex-row gap-x-4 min-h-screen">
        <div className="md:w-2/4 pt-5  md:mb-4">
          <div className="flex justify-evenly  md:justify-between px-4 pt-5 text-gray-900">
            <div className="text-3xl font-bold ">방제목</div>
            {/* 브랜드사 클릭하면 해당 상세페이지로 고? */}
            <div className="text-2xl font-semibold">브랜드사</div>
          </div>
          <iframe
            className="aspect-video  w-full border border-gold rounded-md  shadow-sm"
            src={`https://iframe.videodelivery.net/ff65d18100da52b60d8856264234a3b9`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>

          <div className="flex flex-row mt-3 md:h-1/4">
            <div className="mr-4 border-2 bg-slate-400 p-2 md:w-1/4 md:h-3/4 rounded-md ">
              상품이미지
            </div>
            <div className="space-y-2">
              <span className="text-2xl block  text-gray-900">상품 이름</span>
              <span className="text-2xl block text-gray-900">가격</span>
              <p className="text-gray-700">경매시작가: 경매단위: </p>
            </div>
          </div>
        </div>
        {/* 경매열 */}
        <div className="pt-5 md:mt-14 md:w-1/5 space-y-2 md:mb-5">
          {/* 실시간 응찰 내역 */}
          <div className="bg-orange-400 md:h-2/4  p-5 rounded-md flex flex-col space-y-3">
            <span>실시간 응찰</span>
            {highMoney.map((val: any, i: number) => (
              <span key={i} className="text-white">
                <span className="font-medium text-gray-800">
                  {val.senderName}님께서{" "}
                </span>
                <span className="font-extrabold">{val.cost}</span> 이더
                응찰하셨습니다!
              </span>
            ))}
          </div>
          {/* 최고가 갱신 */}
          <div className="bg-orange-400 md:h-1/5 p-5 rounded-md flex flex-col space-y-3">
            <span>
              최고가는 <span className="font-extrabold">{highest} </span> 이더
              입니다
            </span>
          </div>
          {/* 응찰하기  */}
          <div className="bg-orange-400 md:h-1/5 p-5 rounded-md flex flex-col space-y-3">
            <input
              type="number"
              className="input-message"
              placeholder="응찰가를 입력하세요"
              value={userData.money}
              onChange={handleMoney}
            />
            <button type="button" className="send-button" onClick={sendPrice}>
              send
            </button>
          </div>
        </div>
        {/* 채팅 */}
        <div className="pt-5 md:mt-[55px] md:mb-[90px] md:w-1/5 ">
          <div className="border-2 rounded-md">
            <h2 className="text-2xl py-2 text-center font-bold bg-white  text-gray-900">
              Live Chat
            </h2>
            <div className="py-10 pb-16 h-[72vh]   bg-white px-4 space-y-4">
              {chats.map((chat: any, index: number) => (
                <>
                  <Message
                    key={index}
                    message={chat.message}
                    reversed={chat.senderName === userData.nickName}
                    nickName={chat.senderName}
                  />
                </>
              ))}
            </div>
          </div>
          <div className=" bottom-0 inset-x-0">
            <div className="flex relative  w-full items-center  mx-auto">
              <input
                type="text"
                value={userData.message}
                onChange={handleMessage}
                className="shadow-sm  rounded-md w-full border-gray-300 focus:ring-gold focus:outline-none pr-12 focus:border-lightGold"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button
                  onClick={sendValue}
                  className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-gold rounded-full px-3 hover:bg-gold text-sm text-white"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" onClick={registerUser}>
        connect
      </button>
    </Layout>
  );
};

export default Stream;
