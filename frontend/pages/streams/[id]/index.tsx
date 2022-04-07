import { ProfileImg } from "@components/cloudflare";
import { Layout } from "@components/ui/layout";
import Message from "@components/ui/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import useSWR from "swr";

let stompClient: any = null;

interface IStreamResponse {
  message: string;
  statusCode: number;
}

interface RoomResponse {
  message: string;
  statusCode: number;
  liveDto: {
    roomId: number;
    userId: number;
    nickname: string;
    cfId: string;
    roomName: string;
    startprice: number;
    cfUrl: string;
    runtime: number;
    cfKey: string;
    starttime: number;
  };
  maxCost: number;
}

const Stream: NextPage = () => {
  const { user, isLoading } = useUser();
  const [chats, setChats]: any = useState([]);
  const [highMoney, setHighMoney]: any = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [alertPrice, setAlertPrice] = useState(false);
  const [alertUp, setAlertUp] = useState(false);
  // const [remainTime, setRemainTime] = useState(0);
  // const [time, setTime]:number = useState(20);
  const [highest, setHighest] = useState(0);
  const [timer, setTimer] = useState(false);
  const [finish, setFinish] = useState(false);
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
  const { data, mutate } = useSWR<RoomResponse>(
    router.query.id ? `${process.env.BASE_URL}/live/${router.query.id}` : null
  );

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
    });

    // 그 방에 대한 정보 subscribe 할 수 있도록
    // stompClient.subscribe(`/subscribe/chat/room/${router.query.id:룸아이디}`, onMessageRecived);
    stompClient.subscribe(`/subscribe/chat/room/${id}`, onMessageRecived);
  };
  const onMessageRecived = (response: any) => {
    const res = JSON.parse(response.body);
    console.log(res);

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
        highMoney.push(res);
        setHighMoney([...highMoney]);
        console.log(highMoney);
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
        roomId: id,
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
    // if (stompClient && userData.money <= highest) {
    //   console.log("돈 더 업");
    // } else if (stompClient) {
    if (stompClient) {
      const priceList = {
        senderName: userData.nickName,
        cost: userData.money,
        roomId: id,
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
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };
  const registerUser = async () => {
    await connect();
  };
  // user 데이터 다 받아오면 소켓 연결합니다
  useEffect(() => {
    if (user && id) {
      registerUser();
    } else "오잉";
  }, [user, id]);

  return (
    // navbar 뒤로가기만 생성
    <Layout canGoBack seoTitle="라이브 경매">
      <div className=" absolute ml-3 mt-2  flex justify-center text-gray-600 w-10  bg-lightGold hover:bg-gold hover:text-white hover:duration-300 p-2 rounded-full">
        <Link href="/">
          <a>홈</a>
        </Link>
      </div>
      <div className="flex justify-center flex-col  md:flex-row gap-x-4 min-h-screen px-3">
        <div className="md:w-2/4 pt-5  ">
          <div className="flex justify-evenly  md:justify-between px-4 pt-5 text-gray-900">
            <div className="text-3xl font-bold "> {data?.liveDto.nickname}</div>
            {/* 브랜드사 클릭하면 해당 상세페이지로 고? */}
          </div>
          {/* {remainTime ? (
            <Timer setRemainTime={setRemainTime} time={remainTime} />
          ) : (
            <div>경매가 끝났습니다</div>
          )} */}

          <iframe
            className="aspect-video  w-full border border-gold rounded-md  shadow-sm"
            src={`https://iframe.videodelivery.net/${data?.liveDto.cfId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>

          <div className="flex flex-col md:flex-row gap-x-2 ">
            <div className=" border-2  basis-2/5 bg-lightGold justify-center p-2  flex items-center rounded-md ">
              상품이미지
            </div>
            <div className="space-y-1 ">
              <span className="text-xl block font-semibold text-gray-900">
                판매사 : {data?.liveDto.nickname}
              </span>
              <span className="text-lg block font-semibold text-gray-900">
                상품 이름 :
              </span>
              <span className="text-lg block font-semibold text-gray-900">
                경매시작가 : {data?.liveDto?.startprice}
                <img
                  className="w-5 h-5 inline-block object-contain"
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH"
                />
              </span>
              <span className="text-lg block font-semibold text-gray-900">
                제품 정보 :{" "}
              </span>
              <div>
                {data?.liveDto.nickname === userData.nickName ? (
                  <div className=" border-2  rounded-md hover:border-2 hover:border-slate-300 p-1 bg-slate-200 text-xs">
                    <p>서버 {data.liveDto.cfUrl}</p>
                    <p>방송열쇠 {data.liveDto.cfKey}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* 경매열 */}
        <div className="pt-5 md:mt-[55px] md:w-[21vw] ">
          {/* 실시간 응찰 내역 */}
          <div className="bg-lightGold h-[60vh] p-3 rounded-md  border-2  flex flex-col items-center border-lightBg space-y-3  overflow-y-scroll">
            <span className="text-2xl  text-center font-bold text-gray-900">
              실시간 응찰
            </span>
            {highMoney.map((val: any, i: number) => (
              <span key={i} className="text-gray-800 ">
                {val.senderName}님께서{" "}
                <span className="font-extrabold text-black">
                  {val.cost}
                  <img
                    className="w-5 h-5 inline-block object-contain"
                    src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="ETH"
                  />
                </span>
                응찰하셨습니다
              </span>
            ))}
          </div>
          {/* 최고가 갱신 */}
          <div className="bg-lightGold h-[12vh] text-xl flex rounded-md  border-2  border-lightBg items-center justify-center space-y-3">
            <span className="text-gray-800">
              최고가는{" "}
              <span className="font-extrabold text-black">
                {highest}

                <img
                  className="w-5 h-5 inline-block object-contain"
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH"
                />
              </span>
              입니다
            </span>
          </div>
          {/* 응찰하기  */}
          <div className="bg-lightGold  h-[13vh] flex flex-col gap-x-1 relative  w-full items-center  mx-auto justify-center border-2 border-lightBg  rounded-md  space-y-3">
            <div className="flex justify-center ">
              {alertPrice ? (
                <div>시작가격보다 높은 금액을 응찰하세요</div>
              ) : null}
              {alertUp ? <div>최고가보다 높은 금액을 응찰하세요</div> : null}
            </div>
            {/* {remainTime <= 0 &&
            highMoney[highMoney.length - 1]?.senderName ===
              userData.nickName ? (
              <div className="btn hover:cursor-pointer font-bold text-xl hover:scale-105">
                구매하기
              </div>
            ) : ( */}
            <div className="flex justify-center  gap-x-2">
              <input
                type="text"
                className="shadow-sm  rounded-md w-5/6 border-gray-300 focus:ring-gold focus:outline-none pr-12 focus:border-lightGold "
                placeholder="응찰가를 입력하세요"
                value={userData.money}
                onChange={handleMoney}
              />
              <button
                type="button"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:duration-300   items-center flex  bg-gold rounded-full px-4 hover:bg-gold text-white"
                onClick={sendPrice}
              >
                +
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
        {/* 채팅 */}
        <div className="pt-5 md:mt-[55px] md:w-[21vw] ">
          <div className="border-2 rounded-md">
            <h2 className="text-2xl py-2 text-center font-bold bg-white  text-gray-900">
              Live Chat
            </h2>
            <div className="py-10 pb-16 h-[72vh] overflow-y-scroll  bg-white px-4 space-y-4">
              {chats.map((chat: any, index: number) => (
                <Message
                  key={index}
                  message={chat.message}
                  reversed={chat.senderName === userData.nickName}
                  nickName={chat.senderName}
                  isHost={chat.senderName === data?.liveDto.nickname}
                />
              ))}
            </div>
          </div>
          <div className=" bottom-0  inset-x-0">
            <div className="flex relative  w-full items-center  mx-auto">
              <input
                type="text"
                onKeyPress={onKeyPress}
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

      {/* <Timer
        time={time}
        // finishStream={finishStream}
        timer={timer}
        setTimer={setTimer}
      />
      <button type="button" onClick={registerUser}>
        타이머 시작하기
      </button> */}
    </Layout>
  );
};

export default Stream;
