import useSWR from "swr";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

// interface userInfo {
//   proImg?: string;
//   userName: string;
//   myAsset: number;
//   userId: string;
//   receivername: string;
//   connected: false;
//   message: string;
//   money: number;
// }

// interface Stream {
//   roomId: number;
//   user: userInfo;
// }

// interface StreamResponse {
//   ok: true;
//   stream: Stream;
// }

let stompClient = null;

const Stream = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [hostId, setHostId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [userList, setUserList] = useState([]);
  const [highMoney, setHighMoney] = useState([]);
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

  // 0분이 됐을 때, api에 요청해서 경매 종료로 바꾸면서(백방) 최고가에 대한 정보  ( 유저 아이디랑 가격 )를 가진 유저한테 낙찰 혹은 포기 모달 활성화
  // 결과를 내가 api에 요청해서 보내고 web3~

  // 해당 api에 내가 찾고자 하는 데이터 받아오기(최초시작경매가격, ) => useMutation 써서 최초 시작가 받고,
  // 최종 낙찰가 정해지면 다시 useMutation으로 DB변경
  // const { data, mutate } =
  //   useSWR <
  //   StreamResponse >
  //   (router.query.id ? `/api/streams/${router.query.id}` : router.push("/"),
  //   {
  //     refreshInterval: 1000,
  //   });

  // 들어온 유저가 accessToken 있는지 체크해서 connect하기
  // const userCheck = () => {
  //   null;
  //   connect();
  // };
  // // 최초 들어올 때, userCheck
  // useEffect(() => {
  //   userCheck();
  // }, []);

  const connect = () => {
    let Sock = new SockJS(`https://j6e206.p.ssafy.io:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = () => {
    console.log("error가 무엇이냐");
  };
  // 유저 갱신
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
    // userJoin();
  };

  // const userJoin = () => {
  //   const chatMessage = {
  //     senderName: user?.nickName,
  //     status: "JOIN",
  //   };
  //   stompClient.send(`/publish/chat/join`, {}, JSON.stringify(chatMessage));
  // };

  // 받은 상태값(입장, 경매, 채팅)에 따라 state 변경
  const onMessageRecived = (response) => {
    const res = JSON.parse(response.body);
    console.log("응답은", res);
    if (res) {
      console.log(res);
    } else {
      console.log("error");
    }
    switch (res.status) {
      // case "JOIN":
      // userData가 축적된 객체형 데이터를 userList에 담는다

      // setUserData(...userData,
      // )
      // 유저리스트에 1명이 나니까 내가 방장
      // if (userList.length === 1) {
      //   setIsHost(true);
      //   setHostId(userList.userId);
      // }
      // break;
      case "MESSAGE":
        chats.push(res);
        setChats([...chats]);
        console.log("나는 유저리스트", userList);
        console.log(res);
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
  const onDisConnected = (userId) => {
    setUserList(userList.filter((userList) => userList.find !== userId));
  };
  const handleMoney = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, money: value });
  };
  const handleMessage = (event) => {
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
  // && userData.money > highMoney[-1]
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
    <div className="bg-white min-h-screen">
      {/* {userData.connected ? (
        <> */}
      <>
        <div>최고가는 {highest}</div>
        <ul>
          {highMoney.map((val, i) => (
            <li key={i}>
              {" "}
              {val.senderName} 님께서 최고가{val.cost} 응찰!
            </li>
          ))}
        </ul>

        <div className="send-message">
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
      </>
      <ul className="chat-messages">
        {chats.map((chat, index) => (
          <li
            className={`message ${
              chat.senderName === userData.nickName && "self"
            }`}
            key={index}
          >
            {chat.senderName !== userData.nickName && (
              <div className="avatar">{chat.senderName}</div>
            )}
            <div className="message-data">{chat.message}</div>
            {chat.senderName === userData.nickName && (
              <div className="avatar self">{chat.senderName}</div>
            )}
          </li>
        ))}
      </ul>

      <div className="send-message">
        <input
          type="text"
          className="input-message"
          placeholder="enter the message"
          value={userData.message}
          onChange={handleMessage}
        />
        <button type="button" className="send-button" onClick={sendValue}>
          send
        </button>
      </div>

      <button type="button" onClick={registerUser}>
        connect
      </button>
    </div>
  );
};
// 방에 들어갔는데 accesstoken이 없으면 필요한 정보들은 리코일에 저장하면 된다
// 로그인,로그아웃할 때 지갑 연결했을 때, 지갑 금액 갱신
export default Stream;
